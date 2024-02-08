import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environment/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  userLogin!: any;
  dataClaim!: any;
  fileUrl!: any;

  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayClaim: any;
  entires: any;

  filterDate!: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnInit() {
    this.userLogin = this.authService.getUserLogin();
    // console.log(this.userLogin);
    this.getDataByRole();
  }

  getDataByRole() {
    if (this.userLogin.role_id === 3) {
      this.getAllClaimByUserId(this.userLogin.user_id);
    }
    if (this.userLogin.role_id === 2) {
      this.getAllApprovalAdmin();
    }
    if (this.userLogin.role_id === 1) {
      this.getAllApprovalPartner();
    }
  }

  // APPROVAL ADMIN
  getAllApprovalAdmin() {
    this.apiService.getAllAprovalAdmin().subscribe((res: any) => {
      this.dataClaim = res.data;
      this.fileUrl = environment.apiUrl;
      this.entires = this.dataClaim.length;
      this.updateDisplayClaim();
      this.calculateTotalPages();
    });
  }

  // APPROVAL PARTNER
  getAllApprovalPartner() {
    this.apiService.getAllAprovalPartner().subscribe((res: any) => {
      this.dataClaim = res.data;
      this.fileUrl = environment.apiUrl;
      this.entires = this.dataClaim.length;
      this.updateDisplayClaim();
      this.calculateTotalPages();
    });
  }

  getAllClaimByUserId(userId: number) {
    this.apiService.getAllClaimByUserID(userId).subscribe((res: any) => {
      this.dataClaim = res.data;
      this.fileUrl = environment.apiUrl;
      this.entires = this.dataClaim.length;
      this.updateDisplayClaim();
      this.calculateTotalPages();
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

  // MODAL EXPORT
  toogleModalExport() {
    const element = document.querySelector('#filterExport-modal');
    element?.classList.toggle('hidden');
  }

  onSubmit() {
    const [year, month] = this.filterDate.split('-');
    const data = {
      year: parseInt(year),
      month: parseInt(month),
    };

    this.route.navigate(['/export-pdf'], { queryParams: data });
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayClaim() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayClaim = this.dataClaim.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayClaim();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayClaim();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
