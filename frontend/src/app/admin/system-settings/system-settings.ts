import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

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
    allowWeekendBookings: false,
    requireReasonForBooking: true,
  };

  // Block-out Dates Management
  newBlockDate = '';
  newBlockReason = '';
  blockOutDates = [
    { date: '2024-04-10', reason: 'Eid Al-Fitr Holiday' },
    { date: '2024-04-11', reason: 'Eid Al-Fitr Holiday' },
    { date: '2024-05-15', reason: 'Mid-Semester Break' },
  ];

  isSaving = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

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

  saveSettings() {
    this.isSaving = true;
    // Simulate API Call to Spring Boot
    setTimeout(() => {
      this.isSaving = false;
      alert('System configurations saved successfully!');
      console.log('Saved Config:', this.config);
      console.log('Saved Block-out Dates:', this.blockOutDates);
    }, 800);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
