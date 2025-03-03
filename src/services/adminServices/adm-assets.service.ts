import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmAssetsService {



  readonly APIUrl = 'https://its-rho.vercel.app:5000/api';


  constructor(private http: HttpClient) {}
  

  //Repository
  getAssets(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Assets');
  }

  addAssets(val: any) {
    return this.http.post<any>(this.APIUrl + '/Assets', val);
  }
  updateAssets(val: any) {
    return this.http.put<any>(this.APIUrl + '/Assets', val);
  }
  deleteAssets(val: any) {
    return this.http.delete<any>(this.APIUrl + '/Assets/' + val);
  }
  // uploadFile(val: any) {
  //   return this.http.post(this.APIUrl + '/Assets/SaveFile', val);
  // }



}
