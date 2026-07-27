import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
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
  errorMessage: string = '';
  successMessage: string = '';

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

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = 'Please enter a valid university email.';
      return;
    }

    // Mock password reset link sending
    this.isSubmitted = true;
    this.successMessage = 'A password reset link has been sent to your email address. Redirecting to verification...';

    setTimeout(() => {
      this.router.navigate(['/verification-code']);
    }, 1500);
  }
}
