import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string =
    'http://retail-decline-info.unibank.lan/api/decline/decline-count?page=0&size=10&date=2024-03-05&last=5&type=0';

  constructor(private http: HttpClient) {}

  getDataByType(type: string): Observable<any> {
    return this.http.get<any>(`${this.url}?type=${type}`);
  }

  getDataForDate(date: string): Observable<any> {
    return this.http.get(`${this.url}?date=${date}`);
  }
}
