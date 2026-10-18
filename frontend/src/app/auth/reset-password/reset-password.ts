import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  isDarkMode = false;
  email: string = '';
  code: string = '';
  hasPresetEmail: boolean = false;
  hasPresetCode: boolean = false;
  newPassword = '';
  confirmPassword = '';
  showNewPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  isSuccess = false;
  successMessage = '';
  errorMessage = '';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDarkMode = true;
        this.document.documentElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        this.document.documentElement.classList.remove('dark');
      }
    }

    // Read query parameters from university email link
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.email = params['email'].trim();
        this.hasPresetEmail = true;
      }
      if (params['code']) {
        this.code = params['code'].trim();
        this.hasPresetCode = true;
      }
      this.cdr.detectChanges();
    });
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const emailTrimmed = this.email ? this.email.trim().toLowerCase() : '';
    const codeTrimmed = this.code ? this.code.trim() : '';

    if (!emailTrimmed) {
      this.errorMessage = 'Please provide your registered university email.';
      return;
    }

    if (!codeTrimmed) {
      this.errorMessage = 'Please provide the 6-digit verification code sent to your email.';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isSubmitting = true;

    this.authService.resetPassword({
      email: emailTrimmed,
      code: codeTrimmed,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.successMessage = res?.message || 'Password successfully reset! Redirecting to login page...';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1800);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        let msg = 'Failed to reset password. The link or code may have expired.';
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
}
