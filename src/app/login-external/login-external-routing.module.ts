import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginExternalPage } from './login-external.page';

const routes: Routes = [
  {
    path: '',
    component: LoginExternalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginExternalPageRoutingModule {}
