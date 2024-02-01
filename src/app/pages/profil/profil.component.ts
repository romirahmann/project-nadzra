import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.route.navigate(['auth/login']);
  }
}
