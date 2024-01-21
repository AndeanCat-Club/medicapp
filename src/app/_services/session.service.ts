import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SessionData } from '../_types/session.types';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  session: SessionData | undefined;

  constructor(private storageService: StorageService, private modalController: ModalController, private router: Router, private toastController: ToastController, private eventService: EventService) { 

  }

  async start() {
    this.session = await this.getSession()
    const sessionExist = this.session ? true : false
    this.eventService.emitEventValue('isLoggedChanges', sessionExist)
  }

  setSession(token: SessionData) {
    this.storageService.set('session', token)
  }

  async getSession() {
    return await this.storageService.get('session')
  }

  async getSessionData() {
   return this.session
  }

  async logOut(){
    await this.storageService.clear()
  }

  checkToken(token: string){
    if(!token || !this.isExpired(token)){
        this.logOut();
        this.closeAllModals();
        this.router.navigate(['/login'])
        this.toastsSession();
    }
  }

  async closeAllModals() {
    const modals = await this.modalController.getTop();
    
    if (modals) {
      modals.dismiss(); // Close the top modal
      return;
    }
  }

  isExpired(token: string){
    try{
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte payload del token
        const expiredDate = new Date(decoded.exp * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
        if (expiredDate > new Date()) {
            return true
        } else {
            return false
        }
    } catch(err){
        return false
    }
  }

  async toastsSession() {
    const toast = await this.toastController.create({
      message: 'Tu sesión a expirado',
      duration: 2000
    });
    toast.present();
  }
}