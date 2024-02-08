import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { ProfilComponent } from './profil/profil.component';
import { AddClaimComponent } from './add-claim/add-claim.component';
import { DetailClaimComponent } from './detail-claim/detail-claim.component';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import { DataUserComponent } from './data-user/data-user.component';
import { DataClientComponent } from './data-client/data-client.component';

const routes: Routes = [
  { path: '', component: StatusComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'add-claim', component: AddClaimComponent },
  { path: 'detail-claim/:id', component: DetailClaimComponent },
  { path: 'export-pdf', component: ExportPDFComponent },
  { path: 'data-user', component: DataUserComponent },
  { path: 'data-client', component: DataClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
