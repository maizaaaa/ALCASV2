import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './registration-success.html',
  styleUrl: './registration-success.css',
})
export class RegistrationSuccess implements OnInit {
  isDarkMode = false;
  isResending = false;
  successMessage = '';
  errorMessage = '';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

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


  resendEmail() {
    this.isResending = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Mocking the email resend logic
    setTimeout(() => {
      this.isResending = false;
      this.successMessage = 'Verification link has been successfully resent to your email!';
    }, 1500);
  }
}
