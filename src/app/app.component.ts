import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Personas', url: '/person', icon: 'person' },
    { title: 'Mascotas..', url: '/pet', icon: 'paw' }
  ];
  constructor() {}
}
