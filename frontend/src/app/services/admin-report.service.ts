import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeeklyTrendItem {
  week: string;
  count: number;
  height: string;
}

export interface StatusDistribution {
  completedCount: number;
  completedPercentage: number;
  noShowCount: number;
  noShowPercentage: number;
  cancelledCount: number;
  cancelledPercentage: number;
  pendingCount: number;
  pendingPercentage: number;
}

export interface ConsultationRecordItem {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  studentName: string;
  studentMatric: string;
  lecturerName: string;
  schoolName: string;
  reason: string;
  consultationMode: string;
  status: string;
}

export interface AdminAnalyticsReport {
  totalConsultations: number;
  completedCount: number;
  noShowCount: number;
  cancelledCount: number;
  pendingCount: number;
  completionRate: string;
  mostActiveLecturer: string;
  peakDay: string;
  schoolName: string;
  schoolId: number | null;
  startDate: string;
  endDate: string;
  weeklyTrend: WeeklyTrendItem[];
  statusDistribution: StatusDistribution;
  consultations: ConsultationRecordItem[];
}

export interface School {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminReportService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  getAnalyticsReport(
    startDate?: string,
    endDate?: string,
    schoolId?: number | null
  ): Observable<AdminAnalyticsReport> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (schoolId !== undefined && schoolId !== null && schoolId > 0) {
      params = params.set('schoolId', schoolId.toString());
    }

    return this.http.get<AdminAnalyticsReport>(`${this.apiUrl}/reports/analytics`, {
      headers: this.getHeaders(),
      params,
    });
  }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/schools`, {
      headers: this.getHeaders(),
    });
  }
}
