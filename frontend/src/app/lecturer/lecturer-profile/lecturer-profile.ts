import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { LecturerProfileService } from '../../services/lecturer-profile.service';

@Component({
  selector: 'app-lecturer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-profile.html',
  styleUrls: ['./lecturer-profile.css'],
})
export class LecturerProfileComponent implements OnInit {
  activeTab: string = 'PERSONAL';

  // Profile Data
  profile: any = null;
  showPhotoOptions: boolean = false;

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

  constructor(
    private router: Router,
    private lecturerProfileService: LecturerProfileService,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.lecturerProfileService.getMyProfile().subscribe({
      next: (data) => {
        console.log('PROFILE API RESPONSE:', data);

        this.profile = data;

        console.log('PROFILE AFTER ASSIGN:', this.profile);

        this.preferences = {
          emailNotifications: data.emailNotifications,
          autoReminder24h: data.autoReminder24h,
          autoApproveFyp: data.autoApproveFyp,
        };
      },
      error: (error) => {
        console.error('Failed to load lecturer profile:', error);
      },
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Maximum file size: 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('File is too large. Maximum size is 2MB.');
      return;
    }

    // Only allow image files
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profile.avatarUrl = e.target.result;

      // Save the profile, including the avatar, to the database
      this.lecturerProfileService.updateMyProfile(this.profile).subscribe({
        next: (data) => {
          this.profile = data;
          alert('Profile picture successfully updated!');
        },
        error: (error) => {
          console.error('Failed to save profile picture:', error);
          alert('Failed to save profile picture. Please try again.');
        },
      });
    };

    reader.readAsDataURL(file);
  }

  changeProfilePicture(): void {
    this.showPhotoOptions = false;

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    fileInput?.click();
  }

  removeProfilePicture(): void {
    if (!this.profile?.avatarUrl) {
      return;
    }

    const confirmed = confirm('Are you sure you want to remove your profile picture?');

    if (!confirmed) {
      return;
    }

    this.profile.avatarUrl = null;

    this.lecturerProfileService.updateMyProfile(this.profile).subscribe({
      next: (data) => {
        this.profile = data;
        alert('Profile picture removed successfully!');
      },
      error: (error) => {
        console.error('Failed to remove profile picture:', error);
        alert('Failed to remove profile picture. Please try again.');
      },
    });
  }

  saveProfile(): void {
    if (!this.profile.user.fullName || !this.profile.user.email) {
      alert('Name and Email cannot be empty.');
      return;
    }

    this.lecturerProfileService.updateMyProfile(this.profile).subscribe({
      next: (data) => {
        this.profile = data;

        alert('Profile information successfully updated!');
      },
      error: (error) => {
        console.error('Failed to update lecturer profile:', error);
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  savePreferences(): void {
    console.log('Preferences before save:', this.preferences);

    this.profile.emailNotifications = this.preferences.emailNotifications;
    this.profile.autoReminder24h = this.preferences.autoReminder24h;
    this.profile.autoApproveFyp = this.preferences.autoApproveFyp;

    this.lecturerProfileService.updateMyProfile(this.profile).subscribe({
      next: (data) => {
        this.profile = data;

        this.preferences = {
          emailNotifications: data.emailNotifications,
          autoReminder24h: data.autoReminder24h,
          autoApproveFyp: data.autoApproveFyp,
        };

        alert('Preference & Rules successfully updated!');
      },
      error: (error) => {
        console.error('Failed to update preferences:', error);
        alert('Failed to update preferences. Please try again.');
      },
    });
  }

  updatePassword(): void {
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

    this.lecturerProfileService
      .changePassword(this.passwordForm.current, this.passwordForm.newPass)
      .subscribe({
        next: (message) => {
          alert(message);

          this.passwordForm = {
            current: '',
            newPass: '',
            confirmPass: '',
          };
        },

        error: (error) => {
          console.error('Failed to update password:', error);

          if (error.error) {
            alert(error.error);
          } else {
            alert('Failed to update password. Please try again.');
          }
        },
      });
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
