import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttendanceRecord {
  id: number;
  appointmentId: string;
  studentId: number;
  lecturerId: number;
  attendanceDate: string;
  status: string;
  notes: string | null;
  markedBy: number;
  markedAt: string;
}

export interface AdminAttendanceItem {
  id: number;
  consultationId: string | null;
  studentId: number | null;
  studentName: string;
  studentMatric: string;
  lecturerId: number | null;
  lecturerName: string;
  attendanceDate: string;
  status: string;
  notes: string;
  markedBy: number | null;
  markedByName: string | null;
  markedAt: string | null;
  warningIssued?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/api/attendance';
  private adminApiUrl = 'http://localhost:8080/api/admin/attendance';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getAllAttendance(): Observable<AdminAttendanceItem[]> {
    return this.http.get<AdminAttendanceItem[]>(this.adminApiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  updateAttendanceStatus(
    id: number,
    status: string,
    notes?: string
  ): Observable<AdminAttendanceItem> {
    let params: any = { status };
    if (notes) {
      params.notes = notes;
    }

    return this.http.put<AdminAttendanceItem>(
      `${this.adminApiUrl}/${id}/status`,
      {},
      {
        headers: this.getAuthHeaders(),
        params,
      }
    );
  }

  sendNoShowAlert(id: number, message?: string): Observable<any> {
    const body = message ? { message } : {};
    return this.http.post<any>(
      `${this.adminApiUrl}/${id}/alert`,
      body,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  markAttendance(
    consultationId: string,
    status: string,
    notes: string
  ): Observable<AttendanceRecord> {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    const params = {
      consultationId,
      status,
      notes,
    };

    return this.http.post<AttendanceRecord>(
      `${this.apiUrl}/mark`,
      null,
      {
        headers,
        params,
      }
    );
  }
}

