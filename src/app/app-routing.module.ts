import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_services/authGuard.service';
import { InverseAuthGuard } from './_services/inverseAuthGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then( m => m.PersonPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [InverseAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [InverseAuthGuard]
  },
  {
    path: 'medical-record',
    loadChildren: () => import('./medical-record/medical-record.module').then( m => m.MedicalRecordPageModule),
    canActivate: []
  },
  {
    path: 'donations',
    loadChildren: () => import('./donations/donations.module').then( m => m.DonationsPageModule),
    canActivate: []
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'pet',
    loadChildren: () => import('./pet/pet.module').then( m => m.PetPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pet-record',
    loadChildren: () => import('./pet-record/pet-record.module').then( m => m.PetRecordPageModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
