import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalComponent } from './modal/modal.component';
import { ModalRemoveComponent } from './modal-remove/modal-remove.component';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { EditClientComponent } from './modal-client/edit-client/edit-client.component';
import { ModalEditClaimComponent } from './modal-edit-claim/modal-edit-claim.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    ModalComponent,
    ModalRemoveComponent,
    ModalClientComponent,
    EditClientComponent,
    ModalEditClaimComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    ModalComponent,
    ModalRemoveComponent,
    ModalClientComponent,
    EditClientComponent,
    ModalEditClaimComponent,
  ],
})
export class LayoutsModule {}
