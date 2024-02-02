import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  userLogin!: any;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['auth/login']);
  }
}
