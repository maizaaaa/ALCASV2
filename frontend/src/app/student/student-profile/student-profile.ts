import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { StudentService, StudentProfile, StudentClassSchedule } from '../../services/student.service';

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
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStudentProfile();
      this.loadStudentSchedule();
    }
  }

  // Load student profile from backend
  loadStudentProfile(): void {
    this.studentService.getMyProfile().subscribe({
      next: (profile: StudentProfile) => {
        this.studentData = {
          fullName: profile.fullName,
          nickname: profile.fullName.split(' ')[0],
          studentId: profile.matricNumber,
          email: profile.email,
          phone: profile.phone,
        };

        this.academicData = {
          university: 'Universiti Utara Malaysia (UUM)',
          campus: 'Sintok, Kedah',
          school: profile.school,
          degree: profile.program,
          specialization: 'Software Engineering',
          previousEducation: 'Diploma in Information Technology',
        };

        this.profileImage = profile.profileImg;

        this.emailNotifications = profile.emailNotifications;

        this.autoReminder24h = profile.autoReminder24h;

        this.cdr.detectChanges();

        console.log('Student profile loaded:', profile);
      },

      error: (error) => {
        console.error('Failed to load student profile:', error);

        console.error('Unable to load your profile. Please try again.');
      },
    });
  }

  loadStudentSchedule(): void {
    this.studentService.getMySchedule().subscribe({
      next: (schedule: StudentClassSchedule[]) => {
        this.scheduleData = schedule;

        this.cdr.detectChanges();

        console.log('Student schedule loaded:', schedule);
      },

      error: (error) => {
        console.error('Failed to load student schedule:', error);
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
