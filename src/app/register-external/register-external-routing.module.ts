import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterExternalPage } from './register-external.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterExternalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterExternalPageRoutingModule {}
