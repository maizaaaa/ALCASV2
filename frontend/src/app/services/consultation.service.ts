import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consultation {
  id: string;
  studentId: number;
  studentName: string;
  studentMatric: number;
  lecturerId: number;
  lecturerName: string;
  scheduledDate: string;
  scheduledTime: string;
  reason: string;
  reasonDetails?: string;
  consultationMode: string;
  location: string;
  status: string;
  proposedDate?: string | null;
  proposedTime?: string | null;
  rescheduleReason?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8080/api/consultations';

  constructor(private http: HttpClient) {}

  getLecturerConsultations(): Observable<Consultation[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Consultation[]>(`${this.apiUrl}/lecturer`, { headers });
  }

  approveConsultation(consultationId: string): Observable<Consultation> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Consultation>(`${this.apiUrl}/${consultationId}/approve`, {}, { headers });
  }

  rejectConsultation(consultationId: string, rejectReason: string): Observable<Consultation> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/reject`,
      {},
      {
        headers,
        params: {
          rejectReason: rejectReason,
        },
      },
    );
  }
}
