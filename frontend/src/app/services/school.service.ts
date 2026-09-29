import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface School {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private apiUrl = 'http://localhost:8080/api/schools';

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.apiUrl);
  }
}
