import { Component } from '@angular/core';
import { SessionService } from './_services/session.service';
import { StorageService } from './_services/storage.service';
import { Router } from '@angular/router';
import { EventService } from './_services/event.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Personas', url: '/person', icon: 'person' },
    { title: 'Mascotas', url: '/pet/list-pet', icon: 'paw' },
    { title: 'Donaciones', url: '/donations', icon: 'gift' }
  ];

  public notLoggedPages = [
    { title: 'Iniciar Sesión', url: '/login', icon: 'person' },
    { title: 'Crear Cuenta', url: '/register', icon: 'clipboard' },
    { title: 'Donaciones', url: '/donations', icon: 'gift' }

  ];
  menuFlag = false

  menuInfo = false


  constructor(private sessionService: SessionService, private eventService: EventService, private router: Router, private storageService: StorageService){
    this.eventService.addEventEmitter('isLoggedChanges')

    const isLoggedEvent = this.eventService.getEventEmitter('isLoggedChanges')
    isLoggedEvent.subscribe((res: boolean) => {
      this.menuInfo = res
      console.log('this.menuInfo:', this.menuInfo)
    })
  }

  async ngOnInit(){
    await this.storageService.init();
    await this.sessionService.start();
  }

  async logOut(){
    await this.sessionService.logOut()
    this.eventService.emitEventValue('isLoggedChanges', false)
    this.routeTo('login');
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }
}
