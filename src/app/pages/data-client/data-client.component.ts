import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-data-client',
  templateUrl: './data-client.component.html',
  styleUrls: ['./data-client.component.scss'],
})
export class DataClientComponent {
  clients!: any;
  formEditClient!: FormGroup;
  clientID!: number;

  @Output() idClient: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataClient: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formEditClient = this.fb.group({
      client_name: ['', Validators.required],
    });
    this.getAllClient();
  }

  getAllClient() {
    this.apiService.getAllClient().subscribe(
      (res: any) => {
        this.clients = res.data;
      },
      (err: any) => {
        console.log(err);
        this.clients = [];
      }
    );
  }

  getClientById(id: any) {
    this.apiService.getClientById(id).subscribe((res: any) => {
      this.clientID = res.data[0].client_id;
      this.createForm(res.data[0].client_name);
    });
  }

  toogleRemove(clientID: any, clientName: any) {
    if (clientID === null) {
      const modal = document.querySelector('#modalRemove');
      modal?.classList.toggle('hidden');
    } else {
      const modal = document.querySelector('#modalRemove');
      const client = {
        id: clientID,
        name: clientName,
        category: 'client',
      };
      this.dataClient.emit(client);
      modal?.classList.toggle('hidden');
    }
    this.getAllClient();
  }

  toogleModal() {
    const modal = document.querySelector('#modalClient');
    modal?.classList.toggle('hidden');
    this.getAllClient();
  }
  toogleModalEdit(id: any) {
    if (id === null) {
      const modal = document.querySelector('#modalEditClient');
      modal?.classList.toggle('hidden');
    } else {
      const idClient = parseInt(id);
      this.getClientById(idClient);
      const modal = document.querySelector('#modalEditClient');
      modal?.classList.toggle('hidden');
    }
  }
  onSubmitEdit() {
    if (this.formEditClient.invalid) {
      console.log('Error');
    } else {
      this.apiService
        .updateClient(this.clientID, this.formEditClient.value)
        .subscribe((res: any) => {
          console.log('Update Success');
          this.getAllClient();
          this.toogleModalEdit(null);
        });
    }
  }

  createForm(name: string) {
    this.formEditClient = this.fb.group({
      client_name: name,
    });
  }
}
