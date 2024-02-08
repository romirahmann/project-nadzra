import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss'],
})
export class AddClaimComponent {
  formClaim!: FormGroup;
  selectedFile!: File;
  filename!: string;
  isValid: boolean = true;
  dataUserLogin!: any;

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
      file_id: [''],
    });
  }

  onSubmit() {
    if (this.formClaim.invalid) {
      this.isValid = false;
    } else {
      this.uploadFile();
    }
  }

  // upload data reimburesment
  submitData(data: any) {
    this.apiService.addClaim(data).subscribe((res: any) => {
      console.log('Data Berhasil Di Upload!', res);
      this.routes.navigate(['']);
    });
  }

  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadFile(formData).subscribe(
      (res: any) => {
        // console.log('Success Upload: ', res);
        const file_id = res.file_id;
        this.formClaim.patchValue({
          file_id: file_id,
          user_id: this.dataUserLogin.user_id,
        });
        this.submitData(this.formClaim.value);

        // console.log('Data Reimbursement: ', this.formClaim.value);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
