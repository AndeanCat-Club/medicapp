import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicInformationPage } from './medic-information.page';

const routes: Routes = [
  {
    path: '',
    component: MedicInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicInformationPageRoutingModule {}
