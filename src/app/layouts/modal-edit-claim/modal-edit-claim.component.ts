import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-edit-claim',
  templateUrl: './modal-edit-claim.component.html',
  styleUrls: ['./modal-edit-claim.component.scss'],
})
export class ModalEditClaimComponent {
  formEditClaim!: FormGroup;
  clients!: any;
  category!: any;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllClient();
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'EDIT_CLAIM') {
        this.createFormEdit(); // Call createFormEdit when dataReceived is available
      }
    }
  }

  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.claim_id;
    this.apiService
      .updateClaim(id, this.formEditClaim.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  getAllClient() {
    this.apiService.getAllClient().subscribe((res: any) => {
      this.clients = res.data;
      console.log(this.clients);
    });
  }

  // EDIT SUPPLIER
  createFormEdit() {
    const data = this.dataReceived.data;

    this.formEditClaim = this.fb.group({
      description: [data.description], // Added Validators.required for required fields
      payment_date: [data.payment_date], // Added Validators.required for required fields
      nominal: [data.nominal], // Added Validators.required for required fields
      client_id: [data.client_id],
      category_id: [data.category_id], // Is this supposed to be category_id?
    });
  }
}
