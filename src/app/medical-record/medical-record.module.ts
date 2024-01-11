import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalRecordPageRoutingModule } from './medical-record-routing.module';

import { MedicalRecordPage } from './medical-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalRecordPageRoutingModule
  ],
  declarations: [MedicalRecordPage]
})
export class MedicalRecordPageModule {}
