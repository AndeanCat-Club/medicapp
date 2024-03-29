import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Protocolo http para que los servicios se comuniquen con la api

import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PersonService } from './_services/person.service';
import { UtilService } from './_services/utils.service';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';
import { SessionService } from './_services/session.service';
import { QrService } from './_services/qr.service';
import { ValidationService } from './_services/validation.service';
import { EventService } from './_services/event.service';
import { FileService } from './_services/file.service';
import { PetService } from './_services/pet.service';
import { RecoverPasswordService } from './_services/recoverPassword.service'

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'md'
  }), HttpClientModule, AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PersonService, UtilService, AuthService, SessionService, StorageService, QrService, ValidationService, EventService, FileService, PetService, RecoverPasswordService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
