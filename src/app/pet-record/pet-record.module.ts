import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetRecordPageRoutingModule } from './pet-record-routing.module';

import { PetRecordPage } from './pet-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetRecordPageRoutingModule
  ],
  declarations: [PetRecordPage]
})
export class PetRecordPageModule {}
