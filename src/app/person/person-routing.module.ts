import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonPage } from './person.page';

const routes: Routes = [
  {
    path: '',
    component: PersonPage
  },
  {
    path: 'create-person',
    loadChildren: () => import('./create-person/create-person.module').then( m => m.CreatePersonPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonPageRoutingModule {}
