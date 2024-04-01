import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  category_id!: any;

  @Output() dataModalRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnInit() {
    this.userLogin = this.authService.getUserLogin();

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

  getAllClaimByCategory(userId: number, category_id: number) {
    this.apiService
      .getAllClaimByCategory(userId, category_id)
      .subscribe((res: any) => {
        this.dataClaim = res.data;
        this.fileUrl = environment.apiUrl;
        this.entires = this.dataClaim.length;
        this.updateDisplayClaim();
        this.calculateTotalPages();
        this.openFilter();
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
    this.apiService.getFile(filename).subscribe((res: any) => {});
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

  openFilter() {
    const modal = document.querySelector('#dropdownFilter');
    modal?.classList.toggle('hidden');
  }

  toogleModalRemove(claim: any) {
    if (claim !== null) {
      const dataModalRemove = {
        id: claim.claim_id,
        name: claim.description,
        category: 'claim',
      };

      this.dataModalRemove.emit(dataModalRemove);
      const modal = document.querySelector('#modal-remove');
      modal?.classList.toggle('hidden');
      this.getAllClaimByUserId(this.userLogin.user_id);
    } else {
      const modal = document.querySelector('#modal-remove');
      modal?.classList.toggle('hidden');
      this.getAllClaimByUserId(this.userLogin.user_id);
    }
  }

  toogleModalEdit() {
    const modal = document.querySelector('#modal-edit');
    modal?.classList.toggle('hidden');
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
