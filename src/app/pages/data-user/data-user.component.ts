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

  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayUsers!: any;
  entires: any;

  // EMITTER TO MODAL
  @Output() textForModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataModalRemove: EventEmitter<any> = new EventEmitter<any>();

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
    this.getAllUser();
  }

  getAllUser() {
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.dataUsers = res.data;
      this.entires = this.dataUsers.length;
      console.log(this.dataUsers);
      this.calculateTotalPages();
      this.updateDisplayUsers();
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

  toogleModalRemove(user: any) {
    if (user !== null) {
      const dataModalRemove = {
        id: user.user_id,
        name: user.username,
        category: 'user',
      };
      // console.log('Component Data User', dataModalRemove);
      this.dataModalRemove.emit(dataModalRemove);
      const modalRemove = document.querySelector('#modalRemove');
      modalRemove?.classList.toggle('hidden');
    } else {
      this.getAllUser();
      const modalRemove = document.querySelector('#modalRemove');
      modalRemove?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayUsers = this.dataUsers.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayUsers();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayUsers();
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
