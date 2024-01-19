import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }
}
