import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss'],
})
export class ModalClientComponent {
  formAddClient!: FormGroup;

  isValid: boolean = true;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() textForModal: EventEmitter<any> = new EventEmitter<string>();
  @Input() receivedID: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formAddClient = this.fb.group({
      client_name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formAddClient.invalid) {
      this.isValid = false;
    } else {
      this.addClient();
    }
  }

  addClient() {
    this.apiService.addClient(this.formAddClient.value).subscribe(
      (res: any) => {
        const success = 'Add Client';
        this.textForModal.emit(success);
        this.showModalSuccess();
      },
      (err: any) => {
        console.log('Add Client Failed!', err);
      }
    );
  }

  showModalSuccess() {
    const modalSuccess = document.querySelector('#modalSuccess');
    modalSuccess?.classList.remove('hidden');
    setTimeout(() => {
      modalSuccess?.classList.add('hidden');
      this.closeModal();
    }, 2000);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  testEvent() {
    console.log('Test Event Emmiterr successfully');
  }
}
