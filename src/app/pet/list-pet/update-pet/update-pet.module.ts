import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePetPageRoutingModule } from './update-pet-routing.module';

import { UpdatePetPage } from './update-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatePetPageRoutingModule
  ],
  declarations: [UpdatePetPage]
})
export class UpdatePetPageModule {}
