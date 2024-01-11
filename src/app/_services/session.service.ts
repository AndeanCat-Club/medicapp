import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SessionData } from '../_types/session.types';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  session: SessionData | undefined;

  constructor(private storageService: StorageService) { 

  }

  async start() {
    this.session = await this.getSession()
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