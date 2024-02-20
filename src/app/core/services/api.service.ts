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

  // USERS
  registrasi(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/master/registrasi`, data);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/users`);
  }
  getUserByUserId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/user/${id}`);
  }

  updateUser(userID: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/master/user/${userID}`, data);
  }

  // GET CLIENT
  getAllClient(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/clients`);
  }
  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/client/${id}`);
  }
  addClient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/master/client`, data);
  }
  updateClient(clientID: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/master/client/${clientID}`, data);
  }

  // REIMBURSEMENT
  getAllClaimByUserID(userID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/reimbursement-user/${userID}`);
  }
  getAllClaimByCategory(userID: number, category_id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/master/reimbursement-client/${userID}/${category_id}`
    );
  }
  addClaim(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/master/reimbursement`, data);
  }
  updateClaim(claimID: number, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/master/reimbursement/${claimID}`,
      data
    );
  }
  exportFilter(month: any, year: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/filter-claim/${month}/${year}`);
  }
  totalClaims(userID: any, roleID: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/master/total-claim/${userID}/${roleID}`
    );
  }

  // Approval Admin
  getAllAprovalAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/approvals-admin`);
  }
  getByClaimId(claimID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/approval-admin/${claimID}`);
  }
  updateApprovalAdmin(approvalID: any, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/master/approval-admin/${approvalID}`,
      data
    );
  }
  submitApproval(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/master/approval-admin`, data);
  }

  // APPROVAL PARTNERS
  getAllAprovalPartner(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/approvals-partners`);
  }
  ApprovalToPartner(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/master/approval-partner`, data);
  }
  updateApprovalPartner(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/master/approval-partner/${id}`, data);
  }

  // FILE
  uploadFile(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  getFile(filename: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/file/${filename}`);
  }
}
