import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { StudentService, StudentProfile, StudentClassSchedule } from '../../services/student.service';
import { SystemSettingsService } from '../../services/system-settings.service';


@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarStudent],
  templateUrl: './student-profile.html',
})
export class StudentProfileComponent implements OnInit {
  // Tab State
  activeTab: 'profile' | 'schedule' = 'profile';

  // Schedule Data (Default working days so grid is never empty on load)
  days: string[] = [];

  timeSlots = [
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '01:30 PM',
    '02:30 PM',
    '03:30 PM',
    '04:30 PM',
    '05:30 PM',
    '06:30 PM',
  ];

  scheduleData: StudentClassSchedule[] = [];

  // Schedule Slot Editing State
  showScheduleModal = false;
  selectedSlotDay = '';
  selectedSlotTime = '';
  selectedSlotCategory = 'CLASS';
  editingSlotId: number | null = null;
  isSavingSlot = false;

  // Profile Image State
  profileImage: string | ArrayBuffer | null = null;

  // Profile Data
  studentData = {
    fullName: '',
    nickname: '',
    studentId: '',
    email: '',
    phone: '',
  };

  // Academic Data
  academicData: {
    university: string;
    campus: string;
    school: string;
    degree: string;
    specialization: string;
    previousEducation: string;
  } = {
    university: 'Universiti Utara Malaysia (UUM)',
    campus: 'Sintok, Kedah',
    school: '',
    degree: '',
    specialization: 'Software Engineering',
    previousEducation: 'Diploma in Information Technology',
  };

  // Notification Settings
  emailNotifications = true;
  autoReminder24h = true;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private systemSettingsService: SystemSettingsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAllData();
    }
  }

  loadAllData(): void {
    this.loadWorkingDays();
    this.loadStudentProfile();
    this.loadStudentSchedule();
  }

  private loadWorkingDays(): void {
    const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    this.systemSettingsService.getWorkingDays().subscribe({
      next: (workingDays: string[]) => {
        this.days = [...workingDays]
          .filter((day) => dayOrder.includes(day.trim().toUpperCase()))
          .sort(
            (a, b) =>
              dayOrder.indexOf(a.trim().toUpperCase()) - dayOrder.indexOf(b.trim().toUpperCase()),
          )
          .map((day) => day.trim().charAt(0).toUpperCase() + day.trim().slice(1).toLowerCase());
      },
      error: (error) => {
        console.error('Failed to load working days:', error);
      },
    });
  }


  private loadStudentProfile(): void {
    console.log('[Student Profile] Request started');

    this.studentService.getMyProfile().subscribe({
      next: (profile: StudentProfile) => {
        console.log('[Student Profile] Response received:', profile);

        this.studentData = {
          fullName: profile.fullName || '',
          nickname: profile.fullName?.split(' ')[0] || '',
          studentId: profile.matricNumber || '',
          email: profile.email || '',
          phone: profile.phone || '',
        };

        this.academicData = {
          university: 'Universiti Utara Malaysia (UUM)',
          campus: 'Sintok, Kedah',
          school: profile.school || '',
          degree: profile.program || '',
          specialization: 'Software Engineering',
          previousEducation: 'Diploma in Information Technology',
        };

        this.profileImage = profile.profileImg || null;
        this.emailNotifications = profile.emailNotifications ?? true;
        this.autoReminder24h = profile.autoReminder24h ?? true;

        console.log('[Student Profile] Assigned data:', this.studentData);
      },
      error: (error) => {
        console.error('[Student Profile] Failed to load:', error);
      },
    });
  }

  loadStudentSchedule(): void {
    this.studentService.getMySchedule().subscribe({
      next: (schedule: StudentClassSchedule[]) => {
        this.scheduleData = schedule;
      },
      error: (error) => {
        console.error('Failed to load student schedule:', error);
      },
    });
  }

  getSlotForItem(day: string, time: string): StudentClassSchedule | undefined {
    return this.scheduleData.find(
      (s) => s.dayOfWeek.toLowerCase() === day.toLowerCase() && s.timeSlot === time,
    );
  }

  openSlotModal(day: string, time: string): void {
    const existing = this.getSlotForItem(day, time);
    this.selectedSlotDay = day;
    this.selectedSlotTime = time;

    if (existing) {
      this.editingSlotId = existing.id;
      this.selectedSlotCategory = existing.category;
    } else {
      this.editingSlotId = null;
      this.selectedSlotCategory = 'CLASS';
    }

    this.showScheduleModal = true;
  }

  closeSlotModal(): void {
    this.showScheduleModal = false;
    this.editingSlotId = null;
    this.selectedSlotCategory = 'CLASS';
  }

  saveSlot(): void {
    if (!this.selectedSlotCategory.trim()) {
      alert('Please select or type a category for this time slot.');
      return;
    }

    this.isSavingSlot = true;

    this.studentService
      .saveScheduleSlot({
        id: this.editingSlotId || undefined,
        dayOfWeek: this.selectedSlotDay,
        timeSlot: this.selectedSlotTime,
        category: this.selectedSlotCategory.trim(),
      })
      .subscribe({
        next: () => {
          this.isSavingSlot = false;
          this.closeSlotModal();
          this.loadStudentSchedule();
        },
        error: (err) => {
          console.error('Failed to save slot:', err);
          this.isSavingSlot = false;
          alert('Failed to save schedule slot. Please try again.');
        },
      });
  }

  deleteSlot(): void {
    if (!this.editingSlotId) {
      return;
    }

    if (!confirm('Are you sure you want to remove this class slot?')) {
      return;
    }

    this.isSavingSlot = true;
    this.studentService.deleteScheduleSlot(this.editingSlotId).subscribe({
      next: () => {
        this.isSavingSlot = false;
        this.closeSlotModal();
        this.loadStudentSchedule();
      },
      error: (err) => {
        console.error('Failed to delete slot:', err);
        this.isSavingSlot = false;
        alert('Failed to delete schedule slot. Please try again.');
      },
    });
  }

  // Allow student to update their avatar locally
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.profileImage = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
