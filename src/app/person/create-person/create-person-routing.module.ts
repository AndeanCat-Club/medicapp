import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePersonPage } from './create-person.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePersonPageRoutingModule {}
