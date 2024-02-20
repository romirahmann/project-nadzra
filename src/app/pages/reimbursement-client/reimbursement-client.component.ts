import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reimbursement-client',
  templateUrl: './reimbursement-client.component.html',
  styleUrls: ['./reimbursement-client.component.scss'],
})
export class ReimbursementClientComponent {
  formClaim!: FormGroup;
  selectedFile!: File;
  filename!: string;
  isValid: boolean = true;
  dataUserLogin!: any;
  clients!: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private routes: Router
  ) {}

  ngOnInit() {
    this.dataUserLogin = this.authService.getUserLogin();
    this.formClaim = this.fb.group({
      user_id: [''],
      description: ['', [Validators.required]],
      payment_date: ['', [Validators.required]],
      nominal: ['', [Validators.required]],
      client_id: ['', [Validators.required]],
      category_id: [2, [Validators.required]],
      file_id: [''],
    });
    this.getClients();
  }

  onSubmit() {
    if (this.formClaim.invalid) {
      this.isValid = false;
    } else {
      this.uploadFile();
    }
  }
  // Get Client
  getClients() {
    this.apiService.getAllClient().subscribe((res: any) => {
      this.clients = res.data;
    });
  }

  // upload data reimburesment
  submitData(data: any) {
    this.apiService.addClaim(data).subscribe((res: any) => {
      this.routes.navigate(['']);
    });
  }

  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadFile(formData).subscribe(
      (res: any) => {
        const file_id = res.file_id;
        this.formClaim.patchValue({
          file_id: file_id,
          user_id: this.dataUserLogin.user_id,
        });

        this.submitData(this.formClaim.value);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
