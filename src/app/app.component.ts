import { Component } from '@angular/core';
import { SessionService } from './_services/session.service';
import { StorageService } from './_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Personas', url: '/person', icon: 'person' },
    { title: 'Mascotas... proximamente', url: '/pet', icon: 'paw' }
  ];
  menuFlag = false
  
  constructor(private sessionService: SessionService, private router: Router, private storageService: StorageService){

  }

  async ngOnInit(){
    await this.storageService.init();
    await this.sessionService.start();
  }

  async logOut(){
    await this.sessionService.logOut()
    this.routeTo('login');
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }
}
