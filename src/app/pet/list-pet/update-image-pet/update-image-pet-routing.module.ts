import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateImagePetPage } from './update-image-pet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateImagePetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateImagePetPageRoutingModule {}
