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
  lecturerRemarks?: string | null;
  consultationMode: string;
  location: string;
  status: string;
  proposedDate?: string | null;
  proposedTime?: string | null;
  rescheduleReason?: string | null;
  rejectReason?: string | null;
  cancelReason?: string | null;
  rescheduleInitiator?: string | null;
  notes?: string | null;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8080/api/consultations';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getAllConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>('http://localhost:8080/api/admin/consultations', {
      headers: this.getAuthHeaders(),
    });
  }

  getLecturerConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/lecturer`, {
      headers: this.getAuthHeaders(),
    });
  }

  getStudentConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/student`, {
      headers: this.getAuthHeaders(),
    });
  }

  cancelConsultation(consultationId: string, cancelReason: string): Observable<Consultation> {
    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/cancel`,
      {},
      {
        headers: this.getAuthHeaders(),
        params: {
          cancelReason,
        },
      },
    );
  }

  approveConsultation(
    consultationId: string,
    location: string,
    remarks: string,
    consultationMode?: string,
  ): Observable<Consultation> {
    const params: any = {
      location: location,
      remarks: remarks,
    };
    if (consultationMode) {
      params.consultationMode = consultationMode;
    }

    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/approve`,
      {},
      {
        headers: this.getAuthHeaders(),
        params: params,
      },
    );
  }

  rejectConsultation(consultationId: string, rejectReason: string): Observable<Consultation> {
    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/reject`,
      {},
      {
        headers: this.getAuthHeaders(),
        params: {
          rejectReason: rejectReason,
        },
      },
    );
  }

  requestReschedule(
    consultationId: string,
    proposedDate: string,
    proposedTime: string,
    rescheduleReason: string,
  ): Observable<Consultation> {
    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/reschedule`,
      {},
      {
        headers: this.getAuthHeaders(),
        params: {
          proposedDate,
          proposedTime,
          rescheduleReason,
        },
      },
    );
  }

  acceptReschedule(consultationId: string): Observable<Consultation> {
    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/reschedule/accept`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  rejectReschedule(consultationId: string): Observable<Consultation> {
    return this.http.put<Consultation>(
      `${this.apiUrl}/${consultationId}/reschedule/reject`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  getLecturerAvailability(lecturerId: number, date: string): Observable<{
    lecturerId: number;
    date: string;
    dayOfWeek: string;
    availableSlots: string[];
  }> {
    return this.http.get<{
      lecturerId: number;
      date: string;
      dayOfWeek: string;
      availableSlots: string[];
    }>(`http://localhost:8080/api/lecturer-availability?lecturerId=${lecturerId}&date=${date}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLecturerSchedules(lecturerId: number): Observable<Array<{
    id: number;
    lecturerId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    slotType: string;
    title: string;
  }>> {
    return this.http.get<any[]>(`http://localhost:8080/api/lecturer-availability/schedule/${lecturerId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  reportLecturerNoShow(appointmentId: string, studentRemark: string): Observable<Consultation> {
    return this.http.post<Consultation>(
      `${this.apiUrl}/lecturer-no-show`,
      {
        appointmentId,
        studentRemark,
      },
      {
        headers: this.getAuthHeaders(),
        params: {
          appointmentId,
          studentRemark,
        },
      }
    );
  }
}
