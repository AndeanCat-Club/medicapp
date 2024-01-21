import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLogbookPetPage } from './update-logbook-pet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLogbookPetPage
  },
  {
    path: 'add-post',
    loadChildren: () => import('./add-post/add-post.module').then( m => m.AddPostPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLogbookPetPageRoutingModule {}
