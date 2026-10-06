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
  // Mock Global Configuration Data
  config = {
    semesterName: 'Semester A232',
    semesterStart: '2024-03-01',
    semesterEnd: '2024-07-15',
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
  blockOutDates = [
    { date: '2024-04-10', reason: 'Eid Al-Fitr Holiday' },
    { date: '2024-04-11', reason: 'Eid Al-Fitr Holiday' },
    { date: '2024-05-15', reason: 'Mid-Semester Break' },
  ];

  isSaving = false;

  constructor(
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadWorkingDays();
  }

  loadWorkingDays(): void {
    this.systemSettingsService.getWorkingDays().subscribe({
      next: (workingDays) => {
        this.config.workingDays = workingDays;
        console.log('Working Days loaded:', this.config.workingDays);

        this.cdr.detectChanges();
        },
      error: (error) => {
        console.error('Failed to load working days:', error);
      },
    });
  }

  addBlockOutDate() {
    if (this.newBlockDate && this.newBlockReason) {
      this.blockOutDates.push({
        date: this.newBlockDate,
        reason: this.newBlockReason,
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
    this.isSaving = true;

    this.systemSettingsService.updateWorkingDays(
      this.config.workingDays
    ).subscribe({
      next: (response) => {
        this.isSaving = false;

        console.log('Working Days saved:', response);

        alert('System configurations saved successfully!');
      },
      error: (error) => {
        this.isSaving = false;

        console.error('Failed to save working days:', error);

        alert('Failed to save system configurations.');
      },
    });
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
