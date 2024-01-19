import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetPage } from './pet.page';

const routes: Routes = [
  {
    path: '',
    component: PetPage
  },
  {
    path: 'add-pet',
    loadChildren: () => import('./add-pet/add-pet.module').then( m => m.AddPetPageModule)
  },
  {
    path: 'list-pet',
    loadChildren: () => import('./list-pet/list-pet.module').then( m => m.ListPetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetPageRoutingModule {}
