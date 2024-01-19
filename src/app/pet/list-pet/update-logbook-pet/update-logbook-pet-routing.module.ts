import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLogbookPetPage } from './update-logbook-pet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLogbookPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLogbookPetPageRoutingModule {}
