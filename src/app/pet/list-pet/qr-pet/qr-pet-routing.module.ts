import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrPetPage } from './qr-pet.page';

const routes: Routes = [
  {
    path: '',
    component: QrPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrPetPageRoutingModule {}
