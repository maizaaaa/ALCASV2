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

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) { }

  markAttendance(
    consultationId: string,
    status: string,
    notes: string
  ): Observable<AttendanceRecord> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

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
