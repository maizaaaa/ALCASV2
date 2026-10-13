import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';

export interface SchoolItem {
  id: number;
  name: string;
}

export interface ProgramItem {
  id: number;
  name: string;
  schoolId?: number;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent implements OnInit {
  registerData = {
    studentIdNumber: '',
    fullName: '',
    phone: '',
    schoolId: null as number | null,
    programId: null as number | null,
    email: '',
    password: '',
    confirmPassword: '',
  };

  schoolsList: SchoolItem[] = [];
  availablePrograms: ProgramItem[] = [];

  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  isSubmitted = false;
  isEmailManuallyEdited = false;
  errorMessage = '';
  successMessage = '';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    }
    this.loadSchools();
  }

  loadSchools() {
    this.authService.getSchools().subscribe({
      next: (schools) => {
        if (schools && schools.length > 0) {
          this.schoolsList = schools;
        } else {
          this.useFallbackSchools();
        }
        if (this.registerData.fullName && !this.isEmailManuallyEdited) {
          this.registerData.email = this.generateStudentEmail(
            this.registerData.fullName,
            this.registerData.schoolId
          );
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn('Failed to load schools from backend, using default list:', err);
        this.useFallbackSchools();
        if (this.registerData.fullName && !this.isEmailManuallyEdited) {
          this.registerData.email = this.generateStudentEmail(
            this.registerData.fullName,
            this.registerData.schoolId
          );
        }
        this.cdr.detectChanges();
      },
    });
  }

  private useFallbackSchools() {
    this.schoolsList = [
      { id: 1, name: 'School of Computing' },
      { id: 2, name: 'School of Technology Management and Logistics (STML)' },
      { id: 3, name: 'School of Business Management (SBM)' },
      { id: 4, name: 'School of Quantitative Sciences (SQS)' },
    ];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onFullNameChange() {
    if (!this.isEmailManuallyEdited || !this.registerData.email) {
      this.registerData.email = this.generateStudentEmail(
        this.registerData.fullName,
        this.registerData.schoolId
      );
    }
  }

  onEmailManualInput() {
    if (!this.registerData.email || this.registerData.email.trim() === '') {
      this.isEmailManuallyEdited = false;
    } else {
      this.isEmailManuallyEdited = true;
    }
  }

  regenerateEmail() {
    this.isEmailManuallyEdited = false;
    this.registerData.email = this.generateStudentEmail(
      this.registerData.fullName,
      this.registerData.schoolId
    );
    this.cdr.detectChanges();
  }

  getSchoolDomain(schoolId: number | null): string {
    if (!schoolId) {
      return 'soc.uum.edu.my';
    }
    const school = this.schoolsList.find((s) => s.id === Number(schoolId));
    if (!school) {
      return 'soc.uum.edu.my';
    }
    const name = (school.name || '').toLowerCase();
    if (name.includes('computing') || name.includes('soc')) {
      return 'soc.uum.edu.my';
    } else if (name.includes('logistics') || name.includes('technology management') || name.includes('stml')) {
      return 'stml.uum.edu.my';
    } else if (name.includes('business') || name.includes('sbm')) {
      return 'sbm.uum.edu.my';
    } else if (name.includes('quantitative') || name.includes('sqs')) {
      return 'sqs.uum.edu.my';
    }
    return 'soc.uum.edu.my';
  }

  generateStudentEmail(fullName: string, schoolId: number | null): string {
    if (!fullName || !fullName.trim()) {
      return '';
    }

    // Clean up and lowercase
    const cleaned = fullName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ');

    const tokens = cleaned.split(' ').filter((t) => t.length > 0);
    if (tokens.length === 0) return '';

    // Patronymic markers common in Malaysian / UUM student names
    const markers = ['bin', 'binti', 'bt', 'bte', 'al', 'ap', 'so', 'do'];
    const markerIndex = tokens.findIndex((t) => markers.includes(t));

    let emailPrefix = '';
    if (markerIndex > 0) {
      // Tokens before marker (given name, e.g. "Nur Aisyah" before "binti Ahmad")
      const beforeMarker = tokens.slice(0, markerIndex);
      if (beforeMarker.length >= 2) {
        emailPrefix = beforeMarker.slice(0, 2).join('_');
      } else {
        // e.g. "Ahmad bin Razak" -> ahmad_razak
        const afterMarker = tokens.slice(markerIndex + 1);
        if (afterMarker.length > 0) {
          emailPrefix = `${beforeMarker[0]}_${afterMarker[0]}`;
        } else {
          emailPrefix = beforeMarker[0];
        }
      }
    } else {
      // No marker, e.g. "Nur Aisyah" -> nur_aisyah, "Muhammad Danial" -> muhammad_danial
      if (tokens.length >= 2) {
        emailPrefix = tokens.slice(0, 2).join('_');
      } else {
        emailPrefix = tokens[0];
      }
    }

    const domain = this.getSchoolDomain(schoolId);
    return `${emailPrefix}@${domain}`;
  }

  onSchoolChange() {
    this.registerData.programId = null;
    this.availablePrograms = [];

    // Automatically refresh student email domain when school is selected or changed
    if (!this.isEmailManuallyEdited || !this.registerData.email) {
      if (this.registerData.fullName) {
        this.registerData.email = this.generateStudentEmail(
          this.registerData.fullName,
          this.registerData.schoolId
        );
      }
    } else if (this.registerData.email.includes('@')) {
      const parts = this.registerData.email.split('@');
      const newDomain = this.getSchoolDomain(this.registerData.schoolId);
      if (parts[1] && parts[1].includes('uum.edu.my')) {
        this.registerData.email = `${parts[0]}@${newDomain}`;
      }
    }

    if (!this.registerData.schoolId) return;

    const schoolId = Number(this.registerData.schoolId);
    this.authService.getProgramsBySchool(schoolId).subscribe({
      next: (programs) => {
        if (programs && programs.length > 0) {
          this.availablePrograms = programs;
        } else {
          this.useFallbackPrograms(schoolId);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn('Failed to load programs from backend, using default list:', err);
        this.useFallbackPrograms(schoolId);
        this.cdr.detectChanges();
      },
    });
  }

  private useFallbackPrograms(schoolId: number) {
    const fallbackMap: { [key: number]: ProgramItem[] } = {
      1: [
        { id: 1, name: 'Bachelor of Science with Hons (Information Technology)' },
        { id: 2, name: 'Bachelor of Computer Science (BCS)' },
        { id: 3, name: 'Bachelor of Software Engineering (BSE)' },
      ],
      2: [
        { id: 4, name: 'Bachelor of Technology Management (BTM)' },
        { id: 5, name: 'Bachelor of Logistics and Transportation (BLT)' },
      ],
      3: [
        { id: 6, name: 'Bachelor of Business Administration (BBA)' },
        { id: 7, name: 'Bachelor of Marketing (BM)' },
      ],
      4: [
        { id: 8, name: 'Bachelor of Science in Decision Science (BDS)' },
        { id: 9, name: 'Bachelor of Science in Industrial Statistics (BIS)' },
      ],
    };
    this.availablePrograms = fallbackMap[schoolId] || [];
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const emailTrimmed = this.registerData.email ? this.registerData.email.trim().toLowerCase() : '';
    if (!emailTrimmed) {
      this.errorMessage = 'Email address is required.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      this.errorMessage = 'Please enter a valid email address (e.g. nur_aisyah@soc.uum.edu.my).';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    if (!this.registerData.schoolId) {
      this.errorMessage = 'Please select a School.';
      return;
    }

    if (!this.registerData.programId) {
      this.errorMessage = 'Please select a Program of Study.';
      return;
    }

    this.isSubmitting = true;

    const submitPayload = {
      email: this.registerData.email.trim(),
      password: this.registerData.password,
      fullName: this.registerData.fullName.trim(),
      phone: this.registerData.phone.trim(),
      matricNumber: this.registerData.studentIdNumber.trim(),
      schoolId: Number(this.registerData.schoolId),
      programId: Number(this.registerData.programId),
    };

    this.authService.registerStudent(submitPayload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.successMessage = 'Registration successful! Your student account is active. Redirecting to login...';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Registration failed:', err);
        let msg = 'Registration failed. Please check your information and try again.';
        if (err?.error?.message) {
          msg = err.error.message;
        } else if (typeof err?.error === 'string') {
          msg = err.error;
        } else if (err?.message) {
          msg = err.message;
        }
        this.errorMessage = msg;
        this.cdr.detectChanges();
      },
    });
  }
}
