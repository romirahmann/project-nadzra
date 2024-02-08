import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { StatusComponent } from './status/status.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ProfilComponent } from './profil/profil.component';
import { AddClaimComponent } from './add-claim/add-claim.component';
import { DetailClaimComponent } from './detail-claim/detail-claim.component';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import { DataUserComponent } from './data-user/data-user.component';
import { DataClientComponent } from './data-client/data-client.component';

@NgModule({
  declarations: [StatusComponent, ProfilComponent, AddClaimComponent, DetailClaimComponent, ExportPDFComponent, DataUserComponent, DataClientComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
