import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [LayoutsComponent, SidebarComponent, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [ModalComponent],
})
export class LayoutsModule {}
