import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginExternalPageRoutingModule } from './login-external-routing.module';

import { LoginExternalPage } from './login-external.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginExternalPageRoutingModule
  ],
  declarations: [LoginExternalPage]
})
export class LoginExternalPageModule {}
