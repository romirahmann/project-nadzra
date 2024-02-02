import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  userLogin!: any;
  dataClaim!: any;

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
      console.log(this.dataClaim);
    });
  }

  getFile(filename: any) {
    this.apiService.getFile(filename).subscribe((res: any) => {
      console.log();
    });
  }
}
