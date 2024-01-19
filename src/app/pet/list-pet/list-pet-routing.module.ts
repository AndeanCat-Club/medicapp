import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPetPage } from './list-pet.page';

const routes: Routes = [
  {
    path: '',
    component: ListPetPage
  },
  {
    path: 'qr-pet',
    loadChildren: () => import('./qr-pet/qr-pet.module').then( m => m.QrPetPageModule)
  },
  {
    path: 'update-pet',
    loadChildren: () => import('./update-pet/update-pet.module').then( m => m.UpdatePetPageModule)
  },
  {
    path: 'update-image-pet',
    loadChildren: () => import('./update-image-pet/update-image-pet.module').then( m => m.UpdateImagePetPageModule)
  },
  {
    path: 'update-logbook-pet',
    loadChildren: () => import('./update-logbook-pet/update-logbook-pet.module').then( m => m.UpdateLogbookPetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPetPageRoutingModule {}
