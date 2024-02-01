import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { StatusComponent } from './status/status.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [StatusComponent, ProfilComponent],
  imports: [CommonModule, PagesRoutingModule, LayoutsModule],
})
export class PagesModule {}
