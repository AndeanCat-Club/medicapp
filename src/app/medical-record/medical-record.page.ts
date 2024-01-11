import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PersonService } from '../_services/person.service';
import { Person } from '../_types/person.types';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.page.html',
  styleUrls: ['./medical-record.page.scss'],
})
export class MedicalRecordPage implements OnInit {
  codePerson: string | undefined;
  loading: boolean = false;
  person: Person | undefined;

  constructor(private route: ActivatedRoute, private toastController: ToastController, private personService: PersonService ) { 
    if(this.route.snapshot.queryParams['code']){
      this.route.queryParams.subscribe( params =>{
        this.codePerson = params['code'];
        if(this.codePerson){
          this.personService.getPersonByPublicCode(this.codePerson).subscribe((res: Person) => {
            this.person = res;
            console.log('funciona bacán')
          }, err=> {
            this.toastError();
          })
        }
      })
    }
  }

  ngOnInit() {

  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error: Código QR no válido o desactualizado',
      duration: 2000
    });
    toast.present();
  }

  getPersonByPublicCode(){

  }

}
