// // src/app/user.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private apiUrl = 'http://localhost:5000/api/user/register'; // Adjust based on your backend URL

//   constructor(private http: HttpClient) { }

  
//   register(user: any): Observable<any> {
//     return this.http.post(this.apiUrl, user, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     });
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/user'; // Base URL for user-related APIs

  constructor(private http: HttpClient) { }

  // Register New User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Fetch Available Roles (New Feature)
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
}

