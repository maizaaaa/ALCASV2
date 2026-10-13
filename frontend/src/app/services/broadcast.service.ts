import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BroadcastItem {
  id: string;
  date: string;
  subject: string;
  message?: string;
  audience: string;
  channels: string[];
  status: string;
}

export interface SendBroadcastPayload {
  targetAudience: string;
  sendInApp: boolean;
  sendEmail: boolean;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private apiUrl = 'http://localhost:8080/api/admin/broadcasts';

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

  getBroadcasts(): Observable<BroadcastItem[]> {
    return this.http.get<BroadcastItem[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  sendBroadcast(payload: SendBroadcastPayload): Observable<BroadcastItem> {
    return this.http.post<BroadcastItem>(this.apiUrl, payload, {
      headers: this.getHeaders(),
    });
  }
}
