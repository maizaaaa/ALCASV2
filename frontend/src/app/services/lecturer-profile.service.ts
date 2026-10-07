import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LecturerProfileService {
  private apiUrl = 'http://localhost:8080/api/lecturer-profile';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateMyProfile(profile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/me`, profile);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/me/password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        responseType: 'text',
      },
    );
  }
}
