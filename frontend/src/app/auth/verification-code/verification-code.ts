import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verification-code.html',
  styleUrl: './verification-code.css',
})
export class VerificationCode implements OnInit {
  isDarkMode = false;
  email = '';
  otpDigits = ['', '', '', '', '', ''];
  verificationCode = '';
  isSubmitting = false;
  isResending = false;
  isVerified = false;
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

    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.email = params['email'].trim();
      }
      this.cdr.detectChanges();
    });
  }


  onOtpInput(event: any, index: number) {
    const input = event.target;
    let value = input.value;
    
    // Only allow numbers
    value = value.replace(/[^0-9]/g, '');
    
    if (value.length > 0) {
      const digit = value.charAt(value.length - 1);
      this.otpDigits[index] = digit;
      input.value = digit; // Enforce single character in DOM
      
      // Only shift focus if the current input is the active element
      if (this.document.activeElement === input && index < 5) {
        const nextInput = this.document.getElementById('otp-' + (index + 1)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      this.otpDigits[index] = '';
      input.value = '';
    }
    
    this.updateVerificationCode();
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Handle backspace only to move focus backward and clear previous box
    if (event.key === 'Backspace') {
      event.preventDefault();
      this.otpDigits[index] = '';
      input.value = '';
      
      if (index > 0) {
        const prevInput = this.document.getElementById('otp-' + (index - 1)) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          prevInput.value = ''; // Clear DOM value
          this.otpDigits[index - 1] = ''; // Clear model value
        }
      }
      this.updateVerificationCode();
      return;
    }

    // Allow only digits
    if (event.key.length === 1 && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text').trim();
      // Match numeric strings of length up to 6
      if (/^[0-9]{1,6}$/.test(pastedText)) {
        for (let i = 0; i < 6; i++) {
          if (i < pastedText.length) {
            const digit = pastedText.charAt(i);
            this.otpDigits[i] = digit;
            const inputElement = this.document.getElementById('otp-' + i) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = digit;
            }
          } else {
            this.otpDigits[i] = '';
            const inputElement = this.document.getElementById('otp-' + i) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = '';
            }
          }
        }
        this.updateVerificationCode();
        // Focus the last filled field or first empty field
        const focusIndex = Math.min(pastedText.length, 5);
        const focusInput = this.document.getElementById('otp-' + focusIndex) as HTMLInputElement;
        if (focusInput) {
          focusInput.focus();
        }
      }
    }
  }

  updateVerificationCode() {
    this.verificationCode = this.otpDigits.join('');
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.updateVerificationCode();

    if (this.verificationCode.length !== 6) {
      this.errorMessage = 'Verification code must be exactly 6 digits.';
      this.isSubmitting = false;
      return;
    }

    this.isSubmitting = false;
    this.isVerified = true;
    this.successMessage = 'Verification code accepted! Redirecting to password reset page...';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/reset-password'], {
        queryParams: {
          email: this.email,
          code: this.verificationCode,
        },
      });
    }, 1200);
  }

  resendCode() {
    this.isResending = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe({
        next: (res: any) => {
          this.isResending = false;
          this.successMessage = res?.message || 'A new verification code has been dispatched to ' + this.email;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.isResending = false;
          this.errorMessage = err.error?.message || err.message || 'Failed to resend code. Please try again.';
          this.cdr.detectChanges();
        }
      });
    } else {
      setTimeout(() => {
        this.isResending = false;
        this.successMessage = 'A new verification code has been sent to your email!';
        this.cdr.detectChanges();
      }, 1200);
    }
  }
}
