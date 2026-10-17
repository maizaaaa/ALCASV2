import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface StudentNotification {
  id: number | string;
  title: string;
  message: string;
  type: 'maintenance' | 'booking' | 'cancellation' | 'reschedule' | 'broadcast' | 'reminder' | 'system';
  isRead: boolean;
  consultationId?: string | null;
  createdAt?: string;
  timeAgo?: string;
  link?: string;
}

export interface ToastMessage {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class StudentNotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  private refreshSubject = new Subject<void>();
  public refresh$ = this.refreshSubject.asObservable();

  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  triggerRefresh(): void {
    this.refreshSubject.next();
    if (isPlatformBrowser(this.platformId)) {
      window.dispatchEvent(new CustomEvent('student-notification-refresh'));
    }
  }

  showToast(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    this.toastSubject.next({ title, message, type });
  }

  getMyNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  markAsRead(id: number | string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/read`, {}, { headers: this.getHeaders() });
  }

  markAllAsRead(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/read-all`, {}, { headers: this.getHeaders() });
  }

  deleteNotification(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  clearAllNotifications(): Observable<any> {
    return this.http.delete<any>(this.apiUrl, { headers: this.getHeaders() });
  }
}
