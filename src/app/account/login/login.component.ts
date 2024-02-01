import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;
  hideToglePassword = true;
  // Validation
  wrongKaryawanID = false;
  wrongPassword = false;

  constructor(
    private fb: FormBuilder,
    private api: AuthService,
    private route: Router
  ) {}
  ngOnInit() {
    this.formLogin = this.fb.group({
      karyawan_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formLogin.value);
    if (this.formLogin.invalid) {
      // Cek apakah input username kosong
      if (this.formLogin.controls['karyawan_id'].invalid) {
        this.wrongKaryawanID = true; // Tampilkan pesan kesalahan untuk username
      }

      // Cek apakah input password kosong
      if (this.formLogin.controls['password'].invalid) {
        this.wrongPassword = true; // Tampilkan pesan kesalahan untuk password
      }
      return;
    } else {
      this.login();
    }
  }
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }

  login() {
    this.api.login(this.formLogin.value).subscribe((res: any) => {
      console.log(res);
      this.api.savetoken(res.token, res.userData[0]);
      this.route.navigate(['']);
    });
  }
}
