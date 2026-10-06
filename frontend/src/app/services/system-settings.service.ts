import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, map } from 'rxjs';

export interface SystemSetting {
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedAt?: string | null;
  updatedBy?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SystemSettingsService {
  private apiUrl = 'http://localhost:8080/api/system-settings';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  getSetting(settingKey: string): Observable<SystemSetting> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<SystemSetting>(`${this.apiUrl}/${settingKey}`, { headers });
  }

  getWorkingDays(): Observable<string[]> {
    return this.getSetting('WORKING_DAYS').pipe(
      map((setting) =>
        setting.settingValue
          .split(',')
          .map((day) => day.trim())
          .filter((day) => day.length > 0),
      ),
    );
  }

  updateWorkingDays(workingDays: string[]): Observable<SystemSetting> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const requestBody = {
      settingValue: workingDays.join(','),
      description: 'Institution working days',
    };

    return this.http.put<SystemSetting>(`${this.apiUrl}/WORKING_DAYS`, requestBody, { headers });
  }
}
