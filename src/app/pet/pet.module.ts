import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetPageRoutingModule } from './pet-routing.module';

import { PetPage } from './pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetPageRoutingModule
  ],
  declarations: [PetPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetPageModule {}
