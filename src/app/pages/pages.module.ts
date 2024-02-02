import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { StatusComponent } from './status/status.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ProfilComponent } from './profil/profil.component';
import { AddClaimComponent } from './add-claim/add-claim.component';

@NgModule({
  declarations: [StatusComponent, ProfilComponent, AddClaimComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
