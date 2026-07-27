import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';

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
    school: '',
    program: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  schoolPrograms: { [key: string]: string[] } = {
    'School of Computing (SOC)': [
      'Bachelor of Computer Science (BCS)',
      'Bachelor of Information Technology (BIT)',
      'Bachelor of Software Engineering (BSE)',
    ],
    'School of Technology Management and Logistics (STML)': [
      'Bachelor of Technology Management (BTM)',
      'Bachelor of Logistics and Transportation (BLT)',
    ],
    'School of Business Management (SBM)': [
      'Bachelor of Business Administration (BBA)',
      'Bachelor of Marketing (BM)',
    ],
    'School of Quantitative Sciences (SQS)': [
      'Bachelor of Science in Decision Science (BDS)',
      'Bachelor of Science in Industrial Statistics (BIS)',
    ],
  };

  schools: string[] = Object.keys(this.schoolPrograms);
  availablePrograms: string[] = [];

  showPassword = false;
  showConfirmPassword = false;
  isSubmitted = false;
  errorMessage = '';
  successMessage = '';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSchoolChange() {
    const selectedSchool = this.registerData.school;
    this.availablePrograms = selectedSchool ? this.schoolPrograms[selectedSchool] : [];
    this.registerData.program = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const submitPayload = {
      email: this.registerData.email,
      password: this.registerData.password,
      fullName: this.registerData.fullName,
      role: 'STUDENT',
      studentProfile: {
        studentIdNumber: this.registerData.studentIdNumber,
        phone: this.registerData.phone,
        school: {
          // Send school name or let backend look it up. Since school is a entity,
          // usually the mock backend registry works if we pass the details.
          // Let's pass the text directly.
          name: this.registerData.school,
        },
        phoneNum: this.registerData.phone, // fallback naming
      },
    };

    // Mock registration submit without database connection
    this.isSubmitted = true;
    this.successMessage = 'Registration successful! Redirecting to verification page...';
    setTimeout(() => {
      this.router.navigate(['/registration-success']);
    }, 1500);
  }
}
