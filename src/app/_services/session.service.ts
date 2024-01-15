import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SessionData } from '../_types/session.types';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  session: SessionData | undefined;

  constructor(private storageService: StorageService, private eventService: EventService) { 

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
}