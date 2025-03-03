// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AldminloginService {
  private apiUrl = 'http://localhost:5000/api/user/login'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { Username: username, Password: password };

    return this.http.post<any>(this.apiUrl, loginData);
  }
}
