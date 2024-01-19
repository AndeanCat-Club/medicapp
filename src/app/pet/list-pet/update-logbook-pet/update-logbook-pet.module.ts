import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLogbookPetPageRoutingModule } from './update-logbook-pet-routing.module';

import { UpdateLogbookPetPage } from './update-logbook-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLogbookPetPageRoutingModule
  ],
  declarations: [UpdateLogbookPetPage]
})
export class UpdateLogbookPetPageModule {}
