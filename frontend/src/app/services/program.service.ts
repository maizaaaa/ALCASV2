import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Program {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private apiUrl = 'http://localhost:8080/api/programs';

  constructor(private http: HttpClient) {}

  getProgramsBySchool(schoolId: number): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiUrl}/school/${schoolId}`);
  }
}
