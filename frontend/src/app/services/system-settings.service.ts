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

export interface GlobalBlockOutDate {
  date: string;
  reason: string;
}

export interface AcademicCalendarConfig {
  semesterName: string;
  semesterStart: string;
  semesterEnd: string;
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

  getAllSettings(): Observable<SystemSetting[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<SystemSetting[]>(this.apiUrl, { headers });
  }

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

  updateSetting(settingKey: string, settingValue: string, description?: string): Observable<SystemSetting> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const requestBody = {
      settingKey,
      settingValue,
      description,
    };

    return this.http.put<SystemSetting>(`${this.apiUrl}/${settingKey}`, requestBody, { headers });
  }

  updateSettingsBatch(settings: { settingKey: string; settingValue: string; description?: string }[]): Observable<SystemSetting[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<SystemSetting[]>(`${this.apiUrl}/batch`, settings, { headers });
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
    return this.updateSetting('WORKING_DAYS', workingDays.join(','), 'Institution working days');
  }

  getAcademicCalendar(): Observable<AcademicCalendarConfig> {
    return this.getAllSettings().pipe(
      map((settings) => {
        const name = settings.find((s) => s.settingKey === 'SEMESTER_NAME')?.settingValue || '';
        const start = settings.find((s) => s.settingKey === 'SEMESTER_START_DATE')?.settingValue || '';
        const end = settings.find((s) => s.settingKey === 'SEMESTER_END_DATE')?.settingValue || '';
        return {
          semesterName: name,
          semesterStart: start,
          semesterEnd: end,
        };
      }),
    );
  }

  getGlobalBlockOutDates(): Observable<GlobalBlockOutDate[]> {
    return this.getSetting('GLOBAL_BLOCK_OUT_DATES').pipe(
      map((setting) => {
        try {
          return JSON.parse(setting.settingValue) as GlobalBlockOutDate[];
        } catch {
          return [];
        }
      }),
    );
  }

  updateGlobalBlockOutDates(dates: GlobalBlockOutDate[]): Observable<SystemSetting> {
    return this.updateSetting(
      'GLOBAL_BLOCK_OUT_DATES',
      JSON.stringify(dates),
      'Global block-out dates for holidays and breaks',
    );
  }
}
