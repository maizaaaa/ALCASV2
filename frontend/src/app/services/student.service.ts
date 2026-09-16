import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentProfile {
  userId: number;
  fullName: string;
  email: string;
  matricNumber: string;
  phone: string;
  profileImg: string | null;
  school: string;
  program: string;
  emailNotifications: boolean;
  autoReminder24h: boolean;
}

export interface StudentClassSchedule {
  id: number;
  dayOfWeek: string;
  timeSlot: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(
      `${this.apiUrl}/me`
    );
  }

  getMySchedule(): Observable<StudentClassSchedule[]> {
    return this.http.get<StudentClassSchedule[]>(
      `${this.apiUrl}/schedule`
    );
  }
}
