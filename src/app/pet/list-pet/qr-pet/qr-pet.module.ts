import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPetPageRoutingModule } from './qr-pet-routing.module';

import { QrPetPage } from './qr-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPetPageRoutingModule
  ],
  declarations: [QrPetPage]
})
export class QrPetPageModule {}
