import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { SystemSettingsService} from '../../services/system-settings.service';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './system-settings.html',
  styleUrls: ['./system-settings.css'],
})
export class SystemSettingsComponent implements OnInit {
  // Global Configuration Data
  config = {
    semesterName: '',
    semesterStart: '',
    semesterEnd: '',
    defaultSlotDuration: 30, // in minutes
    maxActiveBookingsPerStudent: 3,
    workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    requireReasonForBooking: true,
  };

  availableDays = [
    { value: 'SUNDAY', label: 'Sunday' },
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
  ];

  toggleWorkingDay(day: string): void {
    const index = this.config.workingDays.indexOf(day);

    if (index > -1) {
      this.config.workingDays.splice(index, 1);
    } else {
      this.config.workingDays.push(day);
    }

    console.log('Working Days:', this.config.workingDays);
  }

  // Block-out Dates Management
  newBlockDate = '';
  newBlockReason = '';
  blockOutDates: { date: string; reason: string }[] = [];

  isSaving = false;

  constructor(
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAllSettings();
  }

  loadAllSettings(): void {
    this.systemSettingsService.getAllSettings().subscribe({
      next: (settings) => {
        const semName = settings.find((s) => s.settingKey === 'SEMESTER_NAME');
        if (semName) this.config.semesterName = semName.settingValue;

        const semStart = settings.find((s) => s.settingKey === 'SEMESTER_START_DATE');
        if (semStart) this.config.semesterStart = semStart.settingValue;

        const semEnd = settings.find((s) => s.settingKey === 'SEMESTER_END_DATE');
        if (semEnd) this.config.semesterEnd = semEnd.settingValue;

        const workingDaysSetting = settings.find((s) => s.settingKey === 'WORKING_DAYS');
        if (workingDaysSetting && workingDaysSetting.settingValue) {
          this.config.workingDays = workingDaysSetting.settingValue
            .split(',')
            .map((day) => day.trim())
            .filter((day) => day.length > 0);
        }

        const blockOutSetting = settings.find((s) => s.settingKey === 'GLOBAL_BLOCK_OUT_DATES');
        if (blockOutSetting && blockOutSetting.settingValue) {
          try {
            this.blockOutDates = JSON.parse(blockOutSetting.settingValue);
            this.blockOutDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          } catch {
            this.blockOutDates = [];
          }
        }

        console.log('All system settings loaded successfully:', settings);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load system settings:', error);
      },
    });
  }

  addBlockOutDate() {
    if (this.newBlockDate && this.newBlockReason.trim()) {
      const exists = this.blockOutDates.some((b) => b.date === this.newBlockDate);
      if (exists) {
        alert('This date has already been added as a block-out date.');
        return;
      }

      this.blockOutDates.push({
        date: this.newBlockDate,
        reason: this.newBlockReason.trim(),
      });
      this.blockOutDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Reset inputs
      this.newBlockDate = '';
      this.newBlockReason = '';
    } else {
      alert('Please provide both a date and a reason.');
    }
  }

  removeBlockDate(index: number) {
    this.blockOutDates.splice(index, 1);
  }

  saveSettings(): void {
    if (this.config.semesterStart && this.config.semesterEnd) {
      if (this.config.semesterStart > this.config.semesterEnd) {
        alert('Academic Semester Start Date cannot be after the End Date.');
        return;
      }
    }

    this.isSaving = true;

    const payload = [
      {
        settingKey: 'SEMESTER_NAME',
        settingValue: this.config.semesterName || '',
        description: 'Active academic semester name',
      },
      {
        settingKey: 'SEMESTER_START_DATE',
        settingValue: this.config.semesterStart || '',
        description: 'Academic semester start date',
      },
      {
        settingKey: 'SEMESTER_END_DATE',
        settingValue: this.config.semesterEnd || '',
        description: 'Academic semester end date',
      },
      {
        settingKey: 'WORKING_DAYS',
        settingValue: this.config.workingDays.join(','),
        description: 'Institution working days',
      },
      {
        settingKey: 'GLOBAL_BLOCK_OUT_DATES',
        settingValue: JSON.stringify(this.blockOutDates),
        description: 'Global block-out dates for holidays and breaks',
      },
    ];

    this.systemSettingsService.updateSettingsBatch(payload).subscribe({
      next: (response) => {
        this.isSaving = false;
        console.log('System settings saved successfully:', response);
        alert('System configurations saved successfully!');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Failed to save system settings:', error);
        alert('Failed to save system configurations.');
        this.cdr.detectChanges();
      },
    });
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
