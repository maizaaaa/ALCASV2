import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  detectedRole: string = '';
  isDarkMode: boolean = false;
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Check if the user already has a preference saved in their browser
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this.isDarkMode = true;
        this.document.documentElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        this.document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        this.document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  onEmailChange(email: string) {
    const lowercaseEmail = email.toLowerCase();
    if (!lowercaseEmail) {
      this.detectedRole = '';
      return;
    }
    if (lowercaseEmail.includes('admin')) {
      this.detectedRole = 'ADMIN';
    } else if (lowercaseEmail.includes('_')) {
      this.detectedRole = 'STUDENT';
    } else if (lowercaseEmail.length > 0) {
      this.detectedRole = 'LECTURER';
    }
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please enter your email and password.');
      return;
    }

    console.log('Logging in...');

    this.authService
      .login({
        email: this.loginData.email,
        password: this.loginData.password,
      })
      .subscribe({
        next: (res) => {
          console.log('Login successful:', res);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert(err?.message || 'Login failed. Please check your email and password.');
        },
      });
  }
}
