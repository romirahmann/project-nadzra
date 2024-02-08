import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent {
  dataUsers!: any;
  dataUserLogin!: any;
  dataUser!: any;
  userID!: number;

  formEdit!: FormGroup;
  // EMITTER TO MODAL
  @Output() textForModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getDataUserLogin();
    this.formEdit = this.fb.group({
      username: ['', Validators.required],
      karyawan_id: ['', Validators.required],
      role_id: ['', Validators.required],
    });
  }

  getDataUserLogin() {
    this.dataUserLogin = this.authService.getUserLogin();
    // console.log(this.dataUserLogin);
    this.getAllUser();
  }

  getAllUser() {
    this.apiService.getAllUsers().subscribe((res: any) => {
      // console.log(res.data);
      this.dataUsers = res.data;
    });
  }

  toogleModalEdit(userID: any) {
    if (userID !== null) {
      this.apiService.getUserByUserId(userID).subscribe((res: any) => {
        this.dataUser = res.data[0];
        this.userID = userID;
        this.createForm();
        const modal = document.querySelector('#edit-modal');
        modal?.classList.toggle('hidden');
      });
    } else {
      const modal = document.querySelector('#edit-modal');
      modal?.classList.toggle('hidden');
    }
  }

  createForm() {
    this.formEdit = this.fb.group({
      username: [
        this.dataUser ? this.dataUser.username : '',
        Validators.required,
      ],
      karyawan_id: [
        this.dataUser ? this.dataUser.karyawan_id : '',
        Validators.required,
      ],
      role_id: [
        this.dataUser ? this.dataUser.role_id : '',
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (this.formEdit.valid) {
      this.apiService
        .updateUser(this.userID, this.formEdit.value)
        .subscribe((res: any) => {
          console.log('Update Success', res);
          const textUpdate = 'Update';
          this.textForModal.emit(textUpdate);
          this.showModalSuccess();
        });
    } else {
      console.log('Form Not valid');
    }
  }

  showModalSuccess() {
    const modalSuccess = document.querySelector('#modalSuccess');
    modalSuccess?.classList.remove('hidden');
    this.getAllUser();
    setTimeout(() => {
      modalSuccess?.classList.add('hidden');
      this.toogleModalEdit(null);
    }, 2000);
  }
}
