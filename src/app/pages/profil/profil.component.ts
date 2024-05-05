import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  userLogin!: any;
  claims!: any;
  constructor(
    private authService: AuthService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
    this.getTotalClaims();
  }

  getTotalClaims() {
    this.apiService
      .totalClaims(this.userLogin.user_id, this.userLogin.role_id)
      .subscribe((res: any) => {
        this.claims = res.data;
      });
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['auth/login']);
  }
}
