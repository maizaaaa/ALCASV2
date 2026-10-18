import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  role: 'STUDENT' | 'LECTURER' | 'ADMIN';
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  // 1. Initialize with null so SSR doesn't crash on startup
  private currentRoleSubject = new BehaviorSubject<string | null>(null);
  currentRole$ = this.currentRoleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    // 2. Inject PLATFORM_ID to determine if we are in the browser or on the server
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // 3. Safely check localStorage ONLY if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const savedRole = localStorage.getItem('userRole');
      if (savedRole) {
        this.currentRoleSubject.next(savedRole);
      }
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userRole', res.role);
        }

        this.currentRoleSubject.next(res.role);

        // Requirement 1.2: Redirect based on role
        this.redirectUser(res.role);
      }),
      catchError((err) => {
        return throwError(() => err.message || 'Authentication failed');
      }),
    );
  }

  registerStudent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  getSchools(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/schools');
  }

  getProgramsBySchool(schoolId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/programs/school/${schoolId}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, { responseType: 'text' }).pipe(
      map((res: string) => {
        try {
          return JSON.parse(res);
        } catch {
          return { success: true, message: res };
        }
      })
    );
  }

  resetPassword(payload: { email: string; code: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, payload, { responseType: 'text' }).pipe(
      map((res: string) => {
        try {
          return JSON.parse(res);
        } catch {
          return { success: true, message: res };
        }
      })
    );
  }

  logout() {
    // 5. Safely remove from localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }

    this.currentRoleSubject.next(null);
    this.router.navigate(['/auth/login']); // or ['/login'] depending on your routes
  }

  private redirectUser(role: string) {
    switch (role) {
      case 'STUDENT':
        this.router.navigate(['/student']);
        break;
      case 'LECTURER':
        this.router.navigate(['/lecturer']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
    }
  }
}
