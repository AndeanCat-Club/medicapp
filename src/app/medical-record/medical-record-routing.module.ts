import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalRecordPage } from './medical-record.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalRecordPageRoutingModule {}
