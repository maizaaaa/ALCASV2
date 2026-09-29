import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {
  id: number;
  userId: string | null;
  name: string;
  email: string;
  role: 'STUDENT' | 'LECTURER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  lastLogin: string | null;
  officeRoom: string | null;
  schoolId: number | null;
  programId: number | null;
  phone: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  getUsers(): Observable<AdminUser[]> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<AdminUser[]>(this.apiUrl, { headers });
    }

    return this.http.get<AdminUser[]>(this.apiUrl);
  }

  updateUserStatus(id: number, status: 'ACTIVE' | 'INACTIVE'): Observable<AdminUser> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put<AdminUser>(
        `${this.apiUrl}/${id}/status?status=${status}`,
        {},
        { headers },
      );
    }

    return this.http.put<AdminUser>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  createUser(data: {
    name: string;
    email: string;
    role: 'STUDENT' | 'LECTURER';
    password: string;
    userId: string;
    phone: string;
    schoolId: number;
    programId?: number | null;
    officeRoom?: string;
  }): Observable<AdminUser> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post<AdminUser>(this.apiUrl, data, { headers });
    }

    return this.http.post<AdminUser>(this.apiUrl, data);
  }

  updateUser(
    id: number,
    data: {
      name: string;
      email: string;
      role: 'STUDENT' | 'LECTURER';
    },
  ): Observable<AdminUser> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put<AdminUser>(`${this.apiUrl}/${id}`, data, { headers });
    }

    return this.http.put<AdminUser>(`${this.apiUrl}/${id}`, data);
  }
}
