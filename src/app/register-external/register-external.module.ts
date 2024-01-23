import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterExternalPageRoutingModule } from './register-external-routing.module';

import { RegisterExternalPage } from './register-external.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterExternalPageRoutingModule
  ],
  declarations: [RegisterExternalPage]
})
export class RegisterExternalPageModule {}
