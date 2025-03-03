import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmineventsService {
  refreshList() {
    throw new Error('Method not implemented.');
  }


  readonly APIUrl = 'http://localhost:5000/api';
  readonly PhotoUrl = 'http://localhost:5000/Assets/Files';

  constructor(private http: HttpClient) {}
  

  //Repository
  getEventsList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Events');
  }

  addEvents(val: any) {
    return this.http.post<any>(this.APIUrl + '/Events', val);
  }
  updateEvents(val: any) {
    return this.http.put<any>(this.APIUrl + '/Events', val);
  }
  deleteEvents(val: any) {
    return this.http.delete<any>(this.APIUrl + '/Events/' + val);
  }
  uploadFile(val: any) {
    return this.http.post(this.APIUrl + '/Events/SaveFile', val);
  }

}
