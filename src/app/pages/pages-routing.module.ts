import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { ProfilComponent } from './profil/profil.component';
import { AddClaimComponent } from './add-claim/add-claim.component';

const routes: Routes = [
  { path: '', component: StatusComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'add-claim', component: AddClaimComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
