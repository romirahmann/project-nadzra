import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  formAddUser!: FormGroup;
  hideToglePassword: boolean = true;
  isValid: boolean = true;
  @Output() textForModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formAddUser = this.fb.group({
      username: ['', Validators.required],
      karyawan_id: ['', Validators.required],
      password: ['', Validators.required],
      role_id: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formAddUser.invalid) {
      this.isValid = false;
    } else {
      this.registrasiUser();
    }
  }
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  registrasiUser() {
    this.apiService.registrasi(this.formAddUser.value).subscribe((res: any) => {
      console.log(res.data);
      const success = 'Add User';
      this.textForModal.emit(success);
      this.showModalSuccess();
    });
  }

  showModalSuccess() {
    const modalSuccess = document.querySelector('#modalSuccess');
    modalSuccess?.classList.remove('hidden');
    setTimeout(() => {
      modalSuccess?.classList.add('hidden');
      this.route.navigate(['/data-user']);
    }, 2000);
  }
}
