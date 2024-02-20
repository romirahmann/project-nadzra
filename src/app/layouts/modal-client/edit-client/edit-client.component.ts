import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent {
  @Input() receivedID: any;
  formEditClient!: FormGroup;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  isValid: boolean = true;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.formEditClient = this.fb.group({
      client_name: ['', Validators.required],
    });
    if (this.receivedID) {
      this.getClient();
    }
  }

  getClient() {
    console.log(this.receivedID);
  }

  createForm() {
    this.formEditClient = this.fb.group({
      client_name: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('edit successfuly');
  }
  closeModal() {
    console.log('Close Modal');
  }
}
