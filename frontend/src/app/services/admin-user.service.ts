import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'LECTURER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  lastLogin: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUsers(): Observable<AdminUser[]> {

    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<AdminUser[]>(this.apiUrl, { headers });
    }

    return this.http.get<AdminUser[]>(this.apiUrl);
  }
}
