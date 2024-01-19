import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPetPageRoutingModule } from './list-pet-routing.module';

import { ListPetPage } from './list-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPetPageRoutingModule
  ],
  declarations: [ListPetPage]
})
export class ListPetPageModule {}
