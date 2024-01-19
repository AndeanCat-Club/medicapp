import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetRecordPage } from './pet-record.page';

const routes: Routes = [
  {
    path: '',
    component: PetRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetRecordPageRoutingModule {}
