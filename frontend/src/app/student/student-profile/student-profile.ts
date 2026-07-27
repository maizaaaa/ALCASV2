import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NavbarStudent],
  templateUrl: './student-profile.html',
})
export class StudentProfileComponent implements OnInit {
  // Tab State
  activeTab: 'profile' | 'schedule' = 'profile';

  // Schedule Data
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timeSlots = [
    '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM',
    '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM', '06:30 PM'
  ];
  busyBlocks: Record<string, string> = {};
  activePopupSlot: string | null = null;

  toggleSlot(day: string, time: string): void {
    const slotKey = `${day}-${time}`;
    if (this.busyBlocks[slotKey]) {
      // If it's already busy, clicking it removes it completely
      delete this.busyBlocks[slotKey];
      this.activePopupSlot = null;
    } else {
      // If empty, open the popup to select category
      this.activePopupSlot = this.activePopupSlot === slotKey ? null : slotKey;
    }
  }

  setSlotCategory(day: string, time: string, category: string, event: Event): void {
    event.stopPropagation(); // Prevent cell click from firing
    const slotKey = `${day}-${time}`;
    this.busyBlocks[slotKey] = category;
    this.activePopupSlot = null; // Close popup
  }

  getSlotCategory(day: string, time: string): string | null {
    return this.busyBlocks[`${day}-${time}`] || null;
  }

  // Profile Image State
  profileImage: string | ArrayBuffer | null = null;

  // Permanent University Data (Read-Only)
  studentData = {
    fullName: 'Nurul Maizatul Hasanah binti Noor Azlan',
    nickname: 'Nurul',
    studentId: '281938',
    email: 'nurul_maizatul@uum.edu.my',
    phone: '+60 12-345 6789',
  };

  academicData = {
    university: 'Universiti Utara Malaysia (UUM)',
    campus: 'Sintok, Kedah',
    degree: 'Bachelor of Science with Honours (Information Technology)',
    specialization: 'Software Engineering',
    previousEducation: 'Diploma in Information Technology',
  };

  constructor(private router: Router) { }
  ngOnInit(): void { }

  // Allow them to update their avatar
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
