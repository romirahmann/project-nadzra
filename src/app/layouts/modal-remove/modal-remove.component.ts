import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss'],
})
export class ModalRemoveComponent {
  @Input() receivedData: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();
  @Output() textForModalSucces: EventEmitter<any> = new EventEmitter();

  constructor(private route: Router, private apiService: ApiService) {}

  ngOnInit() {}

  closeModal() {
    this.toogleModalSucces();
    this.closeModalEvent.emit();
  }

  removeUser() {
    const data = {
      is_deleted: 1,
    };
    // console.log(this.receivedData)
    if (this.receivedData.category === 'client') {
      this.apiService
        .updateClient(this.receivedData.id, data)
        .subscribe((res: any) => {
          console.log('Remove Client Success!');
          this.closeModal();
        });
    }
    if (this.receivedData.category === 'user') {
      this.apiService
        .updateUser(this.receivedData.id, data)
        .subscribe((res: any) => {
          console.log('Remove User Successfully!', res);
          this.closeModal();
          this.toogleModalSucces();
        });
    }
    if (this.receivedData.category === 'claim') {
      // console.log(this.receivedData);
      this.apiService.updateClaim(this.receivedData.id, data).subscribe(
        (res: any) => {
          console.log('Remove Claim Successfully', res);
          this.closeModal();
          this.toogleModalSucces();
        },
        (err: any) => {
          console.log('API Failed', err);
        }
      );
    }
  }

  toogleModalSucces() {
    const text = 'Remove';
    this.textForModalSucces.emit(text);
    const modalSuccess = document.querySelector('#modalSuccess');
    modalSuccess?.classList.toggle('hidden');
    setTimeout(() => {
      modalSuccess?.classList.toggle('hidden');
    }, 2000);
  }
}
