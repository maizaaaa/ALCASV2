import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';

@Component({
  selector: 'app-lecturer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-profile.html',
  styleUrls: ['./lecturer-profile.css'],
})
export class LecturerProfileComponent implements OnInit {
  activeTab: string = 'PERSONAL';

  // Mock Profile Data
  profile = {
    id: 'L98765',
    name: 'Dr. Ahmad Fauzi',
    email: 'ahmad.fauzi@university.edu',
    phone: '+60 12-345 6789',
    department: 'School of Computing & IT',
    office: 'Block A, Room BK-34',
    officeHours: 'Mon & Wed: 10:00 AM - 12:00 PM',
    virtualRoomUrl: 'https://university.webex.com/meet/ahmad.fauzi',
    bio: 'Senior Lecturer specializing in Software Engineering and System Architecture. Currently supervising 5 FYP students.',
    avatarUrl: null as string | null,
    totalSessions: 48,
    responseTime: '< 2 hrs',
    fypStudents: 5,
  };

  // Consultation & Notification Preferences
  preferences = {
    emailNotifications: true,
    autoReminder24h: true,
    autoApproveFyp: false,
  };

  // Password Form State
  passwordForm = {
    current: '',
    newPass: '',
    confirmPass: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setTab(tab: string) {
    this.activeTab = tab;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Optional: Check if file is too big (e.g., > 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Maximum size is 2MB.');
        return;
      }

      // Create a live preview URL so the user sees it instantly!
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Note for later: In your Spring Boot backend, you will upload this 'file' object!
    }
  }

  saveProfile() {
    if (!this.profile.name || !this.profile.email) {
      alert('Name and Email cannot be empty.');
      return;
    }
    // In a real app, this sends a PUT request to Spring Boot
    alert('Profile information successfully updated!');
  }

  updatePassword() {
    if (
      !this.passwordForm.current ||
      !this.passwordForm.newPass ||
      !this.passwordForm.confirmPass
    ) {
      alert('Please fill in all password fields.');
      return;
    }
    if (this.passwordForm.newPass !== this.passwordForm.confirmPass) {
      alert('New password and Confirmation do not match!');
      return;
    }

    alert('Password updated successfully! Please use your new password next time you log in.');

    // Clear the form
    this.passwordForm = { current: '', newPass: '', confirmPass: '' };
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
