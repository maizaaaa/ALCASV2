import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  isDarkMode = false;
  newPassword = '';
  confirmPassword = '';
  isSubmitting = false;
  isSuccess = false;
  successMessage = '';
  errorMessage = '';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);

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
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      this.isSubmitting = false;
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.isSubmitting = false;
      return;
    }

    // Mock successful password reset
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.successMessage = 'Password successfully reset! Redirecting to login page...';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }, 1500);
  }
}
