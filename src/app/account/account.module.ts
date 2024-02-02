import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
  ],
})
export class AccountModule {}
