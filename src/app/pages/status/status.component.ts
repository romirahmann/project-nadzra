import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  userLogin!: any;
  dataClaim!: any;
  fileUrl!: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.userLogin = this.authService.getUserLogin();
    // console.log(this.userLogin);
    this.getAllClaimByUserId(this.userLogin.user_id);
  }

  getAllClaimByUserId(userId: number) {
    this.apiService.getAllClaimByUserID(userId).subscribe((res: any) => {
      this.dataClaim = res.data;
      this.fileUrl = environment.apiUrl;
    });
  }

  getFile(filename: any) {
    this.apiService.getFile(filename).subscribe((res: any) => {
      console.log();
    });
  }

  submit(claimID: any) {
    const sc = {
      status_code: 'w',
    };
    const dataClaimID = {
      claim_id: claimID,
    };
    this.apiService.updateClaim(claimID, sc).subscribe((res: any) => {
      this.addAprovalAdmin(dataClaimID);
    });
  }

  addAprovalAdmin(data: any) {
    this.apiService.submitApproval(data).subscribe((res: any) => {
      this.getAllClaimByUserId(this.userLogin.user_id);
    });
  }
}
