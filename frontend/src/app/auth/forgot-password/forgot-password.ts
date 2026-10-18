import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {
  email: string = '';
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

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
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const emailTrimmed = this.email ? this.email.trim().toLowerCase() : '';

    if (!emailTrimmed) {
      this.errorMessage = 'Please enter your registered university email address.';
      return;
    }

    // Basic email regex format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      this.errorMessage = 'Please enter a valid email format (e.g., student_name@soc.uum.edu.my).';
      return;
    }

    // University domain guidance
    if (!emailTrimmed.endsWith('uum.edu.my') && !emailTrimmed.endsWith('@example.com')) {
      this.errorMessage = 'Please enter an official university email ending with uum.edu.my (e.g. @soc.uum.edu.my).';
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(emailTrimmed).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.successMessage = res?.message || 'A password reset link and 6-digit verification code have been dispatched to your university email address.';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        let msg = 'Unable to process password reset. Please check your email or contact support.';
        if (err.error) {
          if (typeof err.error === 'string') {
            try {
              const parsed = JSON.parse(err.error);
              msg = parsed.message || err.error;
            } catch {
              msg = err.error;
            }
          } else if (err.error.message) {
            msg = err.error.message;
          }
        } else if (err.message) {
          msg = err.message;
        }
        this.errorMessage = msg;
        this.cdr.detectChanges();
      }
    });
  }

  goToManualCode() {
    this.router.navigate(['/verification-code'], {
      queryParams: { email: this.email.trim().toLowerCase() }
    });
  }

  resetForm() {
    this.isSubmitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
