import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllClaimByUserID(userID: number) {
    return this.http.get<any>(
      `${this.apiUrl}/master/reimbursement-user/${userID}`
    );
  }
  addClaim(data: any) {
    return this.http.post<any>(`${this.apiUrl}/master/reimbursement`, data);
  }

  // FILE
  uploadFile(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  getFile(filename: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/file/${filename}`);
  }
}
