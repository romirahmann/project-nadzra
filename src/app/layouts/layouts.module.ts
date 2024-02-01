import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutsComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
