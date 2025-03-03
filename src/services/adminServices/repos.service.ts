import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  refreshList() {
    throw new Error('Method not implemented.');
  }


  readonly APIUrl = 'http://localhost:5000/api';


  constructor(private http: HttpClient) {}
  

  //Repository
  getRepoList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/repo');
  }

  addRepository(val: any) {
    return this.http.post<any>(this.APIUrl + '/repo', val);
  }
  updateRepository(val: any) {
    return this.http.put<any>(this.APIUrl + '/repo', val);
  }
  deleteRepository(val: any) {
    return this.http.delete<any>(this.APIUrl + '/repo/' + val);
  }

}
