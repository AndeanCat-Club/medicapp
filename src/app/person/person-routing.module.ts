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
  },
  {
    path: 'update-person',
    loadChildren: () => import('./update-person/update-person.module').then( m => m.UpdatePersonPageModule)
  },
  {
    path: 'medic-information',
    loadChildren: () => import('./medic-information/medic-information.module').then( m => m.MedicInformationPageModule)
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./generate-qr/generate-qr.module').then( m => m.GenerateQrPageModule)
  },
  {
    path: 'upload-image',
    loadChildren: () => import('./upload-image/upload-image.module').then( m => m.UploadImagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonPageRoutingModule {}
