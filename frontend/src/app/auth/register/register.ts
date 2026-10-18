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
      { id: 1, name: 'School of Computing (SOC)' },
      { id: 2, name: 'School of Technology Management and Logistics (STML)' },
      { id: 3, name: 'School of Business Management (SBM)' },
      { id: 4, name: 'School of Quantitative Science (SQS)' },
      { id: 5, name: 'Tunku Puteri Intan Shafinaz School of Accountancy (TISSA)' },
      { id: 6, name: 'School of Economics, Finance and Banking (SEFB)' },
      { id: 7, name: 'Islamic Business School (IBS)' },
      { id: 8, name: 'UUM National Golf Academy (UUMNGA)' },
      { id: 9, name: 'School of Creative Industry Management and Performing Arts (SCIMPA)' },
      { id: 10, name: 'School of Multimedia Technology and Communication (SMMTC)' },
      { id: 11, name: 'School of Applied Psychology, Sosial Work and Policy (SAPSP)' },
      { id: 12, name: 'School of Education (SOE)' },
      { id: 13, name: 'School of Languages, Civilisation and Philosophy (SLCP)' },
      { id: 14, name: 'School of Law (SOL)' },
      { id: 15, name: 'School of International Studies (SOIS)' },
      { id: 16, name: 'School of Government (SOG)' },
      { id: 17, name: 'School of Tourism, Hospitality and Event Management (STHEM)' },
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
    } else if (name.includes('business management') || name.includes('sbm')) {
      return 'sbm.uum.edu.my';
    } else if (name.includes('quantitative') || name.includes('sqs')) {
      return 'sqs.uum.edu.my';
    } else if (name.includes('accountancy') || name.includes('tissa')) {
      return 'tissa.uum.edu.my';
    } else if (name.includes('economics') || name.includes('finance') || name.includes('banking') || name.includes('sefb')) {
      return 'sefb.uum.edu.my';
    } else if (name.includes('islamic') || name.includes('ibs')) {
      return 'ibs.uum.edu.my';
    } else if (name.includes('golf') || name.includes('uumnga')) {
      return 'uumnga.uum.edu.my';
    } else if (name.includes('creative') || name.includes('scimpa')) {
      return 'scimpa.uum.edu.my';
    } else if (name.includes('multimedia') || name.includes('communication') || name.includes('smmtc')) {
      return 'smmtc.uum.edu.my';
    } else if (name.includes('psychology') || name.includes('sapsp')) {
      return 'sapsp.uum.edu.my';
    } else if (name.includes('education') || name.includes('soe')) {
      return 'soe.uum.edu.my';
    } else if (name.includes('languages') || name.includes('slcp')) {
      return 'slcp.uum.edu.my';
    } else if (name.includes('law') || name.includes('sol')) {
      return 'sol.uum.edu.my';
    } else if (name.includes('international') || name.includes('sois')) {
      return 'sois.uum.edu.my';
    } else if (name.includes('government') || name.includes('sog')) {
      return 'sog.uum.edu.my';
    } else if (name.includes('tourism') || name.includes('hospitality') || name.includes('sthem')) {
      return 'sthem.uum.edu.my';
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
        { id: 1, name: 'Bachelor of Science with Honours (Information Technology)' },
        { id: 2, name: 'Bachelor of Computer Science with Honours' },
      ],
      2: [
        { id: 4, name: 'Bachelor Technology Management with Honours' },
        { id: 5, name: 'Bachelor of Business Administration (Logistics & Transportation) with Honours' },
        { id: 10, name: 'Bachelor Operations Management with Honours' },
      ],
      3: [
        { id: 6, name: 'Bachelor of Business Administration with Honours' },
        { id: 7, name: 'Bachelor of Marketing with Honours' },
        { id: 11, name: 'Bachelor of Entrepreneurship with Honours' },
        { id: 12, name: 'Bachelor of Human Resource Management with Honours' },
      ],
      4: [
        { id: 8, name: 'Bachelor of Science in Decision Mathematics and Data Analytics with Honours' },
        { id: 9, name: 'Bachelor of Science with Honours (Industrial Statistics)' },
        { id: 13, name: 'Bachelor of Science with Honours (Business Mathematics)' },
      ],
      5: [
        { id: 14, name: 'Bachelor in Accounting with Honours' },
        { id: 15, name: 'Bachelor in Accounting (Information System) with Honours' },
      ],
      6: [
        { id: 16, name: 'Bachelor of Science in Economics with Honours' },
        { id: 17, name: 'Bachelor of Science in Agribusiness Management with Honours' },
        { id: 18, name: 'Bachelor of Finance with Honours' },
        { id: 19, name: 'Bachelor of Banking with Honours' },
        { id: 20, name: 'Bachelor of Risk Management and Insurance with Honours' },
      ],
      7: [
        { id: 21, name: 'Bachelor of Islamic Finance & Banking' },
        { id: 22, name: 'Bachelor of Muamalat Administration' },
        { id: 23, name: 'Bachelor of Halal Management' },
      ],
      8: [
        { id: 24, name: 'Bachelor of Business Administration (Golf Management) with Honours' },
      ],
      9: [
        { id: 25, name: 'Bachelor in Creative Industry Management' },
      ],
      10: [
        { id: 26, name: 'Bachelor of Communication with Honours' },
        { id: 27, name: 'Bachelor of Media Technology with Honours' },
        { id: 28, name: 'Bachelor of Science (Multimedia) with Honours' },
      ],
      11: [
        { id: 29, name: 'Bachelor of Counselling with Honours' },
        { id: 30, name: 'Bachelor of Social Work Management with Honours' },
      ],
      12: [
        { id: 31, name: 'Bachelor of Education with Honours (Accountancy)' },
        { id: 32, name: 'Bachelor of Education with Honours (Business Administation)' },
        { id: 33, name: 'Bachelor of Education with Honours (Guidance & Counseling)' },
        { id: 34, name: 'Bachelor of Education with Honours (Information Technology)' },
        { id: 35, name: 'Bachelor of Education with Honours (Moral Education)' },
      ],
      13: [
        { id: 36, name: 'Bachelor of Arts (Honours) Liguistics and Information Technology' },
        { id: 37, name: 'Bachelor of Arts in Contemporary Literature and Creative Industry Management (Honours)' },
        { id: 38, name: 'Bachelor of Applied Liguistics and Business Administration (Honours)' },
      ],
      14: [
        { id: 39, name: 'Bachelor of Law with Honours' },
        { id: 40, name: 'Bacholor of Philosophy, Law and Business with Honours' },
      ],
      15: [
        { id: 41, name: 'Bachelor of International Affairs Management with Honours' },
        { id: 42, name: 'Bachelor of International Business Management with Honours' },
      ],
      16: [
        { id: 43, name: 'Bachelor of Public Management with Honours' },
        { id: 44, name: 'Bachelor of Development Management with Honours' },
      ],
      17: [
        { id: 45, name: 'Bachelor in Event Management (Honours)' },
        { id: 46, name: 'Bachelor in Tourism Management (Honours)' },
        { id: 47, name: 'Bachelor in Hospitality Management (Honours)' },
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
