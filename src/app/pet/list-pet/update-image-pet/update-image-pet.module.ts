import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateImagePetPageRoutingModule } from './update-image-pet-routing.module';

import { UpdateImagePetPage } from './update-image-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateImagePetPageRoutingModule
  ],
  declarations: [UpdateImagePetPage]
})
export class UpdateImagePetPageModule {}
