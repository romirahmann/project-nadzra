import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-detail-claim',
  templateUrl: './detail-claim.component.html',
  styleUrls: ['./detail-claim.component.scss'],
})
export class DetailClaimComponent {
  dataReimbursement!: any;
  fileUrl!: any;
  description: any = null;
  claimId!: any;

  selectedFile!: File;
  isNull: boolean = false;

  userLogin!: any;
  isRespon: boolean = false;
  isStatusAP: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.claimId = this.route.snapshot.paramMap.get('id');
    if (this.claimId) {
      this.getDataUserLogin();
      this.getApporvalByClaimId(parseInt(this.claimId));
    }
  }
  getDataUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }

  getApporvalByClaimId(claimID: any) {
    this.apiService.getByClaimId(claimID).subscribe((res: any) => {
      this.dataReimbursement = res.data[0];
      this.fileUrl = environment.apiUrl;
      if (this.dataReimbursement.status_code === 'w') {
        this.isRespon = true;
      }
      if (this.dataReimbursement.status_code === 'AP') {
        this.isStatusAP = true;
      }
      // console.log(this.dataReimbursement);
    });
  }

  openModalApprove() {
    const modal = document.querySelector('#static-modal');
    modal?.classList.toggle('hidden');
  }
  closeModalApprove() {
    const modal = document.querySelector('#static-modal');
    modal?.classList.toggle('hidden');
  }

  onSubmit() {
    if (this.userLogin.role_id === 2) {
      this.submitAdmin();
    }
    if (this.userLogin.role_id === 1) {
      this.submitPartner();
    } else {
      console.log('Error Submit');
    }
    // console.log(this.dataReimbursement.approval_admin_id);
  }

  // SUBMIT ADMIN
  submitAdmin() {
    if (this.description !== null) {
      const desc = {
        approval_admin_desc: this.description,
      };
      const approvalID = this.dataReimbursement.approval_admin_id;
      this.apiService
        .updateApprovalAdmin(approvalID, desc)
        .subscribe((res: any) => {
          console.log('Update Approval Admin Success!!');
        });
    }
    this.approve();
  }
  // SUBMIT PARTNER
  submitPartner() {
    if (this.selectedFile !== undefined) {
      this.uploadFile();
    } else {
      this.isNull = true;
    }
  }

  approve() {
    if (this.userLogin.role_id === 2) {
      const accept = {
        status_code: 'AA',
      };

      this.apiService
        .updateClaim(this.claimId, accept)
        .subscribe((res: any) => {
          console.log('Accept Claim!');
          this.getApporvalByClaimId(parseInt(this.claimId));
          this.approvalToPartner();
          this.closeModalApprove();
        });
    }
    if (this.userLogin.role_id === 1) {
      const accept = {
        status_code: 'AP',
      };

      this.apiService
        .updateClaim(this.claimId, accept)
        .subscribe((res: any) => {
          console.log('Accept Claim!');
          this.getApporvalByClaimId(parseInt(this.claimId));
          this.closeModalApprove();
        });
    }
  }

  declineApproval() {
    if (this.userLogin.role_id === 2) {
      const decline = {
        status_code: 'TA',
      };
      this.apiService
        .updateClaim(this.claimId, decline)
        .subscribe((res: any) => {
          console.log('Accept Claim!');
          this.getApporvalByClaimId(parseInt(this.claimId));
          this.closeModalApprove();
        });
    }
    if (this.userLogin.role_id === 1) {
      const decline = {
        status_code: 'TP',
      };
      this.apiService
        .updateClaim(this.claimId, decline)
        .subscribe((res: any) => {
          console.log('Accept Claim!');
          this.getApporvalByClaimId(parseInt(this.claimId));
          this.closeModalApprove();
        });
    } else {
      console.log('Error Submit');
    }
  }

  approvalToPartner() {
    const dataForPartner = {
      approval_admin_id: this.dataReimbursement.approval_admin_id,
    };

    this.apiService.ApprovalToPartner(dataForPartner).subscribe((res: any) => {
      console.log('Success Add Approval Partner!');
      this.getApporvalByClaimId(parseInt(this.claimId));
    });
  }

  // Upload File TTD
  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.isNull = false;
    // console.log(this.selectedFile);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadFile(formData).subscribe((res: any) => {
      console.log('Upload File Success', res);
      const data = {
        approval_partner_desc: this.description,
        file_id: res.file_id,
      };

      this.apiService
        .updateApprovalPartner(this.dataReimbursement.approval_admin_id, data)
        .subscribe((res: any) => {
          console.log('Update Apporval Partner Success!');

          this.approve();

          this.closeModalApprove();
        });
    });
  }
}
