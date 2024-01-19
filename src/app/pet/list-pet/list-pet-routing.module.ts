import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPetPage } from './list-pet.page';

const routes: Routes = [
  {
    path: '',
    component: ListPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPetPageRoutingModule {}
