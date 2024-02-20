import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-claim',
  templateUrl: './modal-edit-claim.component.html',
  styleUrls: ['./modal-edit-claim.component.scss'],
})
export class ModalEditClaimComponent {
  formEditClaim!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.formEditClaim = this.fb.group({
      description: ['', [Validators.required]],
      payment_date: ['', [Validators.required]],
      nominal: ['', [Validators.required]],
      client_id: ['', [Validators.required]],
      client_name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      file_id: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('submit');
  }
  closeModal() {
    console.log('Close Modal');
  }
}
