import { Router } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegist!: FormGroup;
  hideToglePassword = true;
  // EMITTER TO MODAL
  @Output() textForModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.formRegist = this.fb.group({
      username: ['', Validators.required],
      karyawan_id: ['', Validators.required],
      password: ['', Validators.required],
      role_id: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }

  onSubmit() {
    this.register();
  }

  register() {
    if (this.formRegist.valid) {
      this.apiService.registrasi(this.formRegist.value).subscribe(
        (res: any) => {
          const textRegister = 'Register';
          this.textForModal.emit(textRegister);
          this.showModal();
        },
        (err: any) => {
          alert('Register Failed!');
        }
      );
    }
  }

  showModal() {
    const modalSuccess = document.querySelector('#modalSuccess');
    modalSuccess?.classList.remove('hidden');
    setTimeout(() => {
      modalSuccess?.classList.add('hidden');
      this.route.navigate(['/auth/login']);
    }, 2000);
  }
}
