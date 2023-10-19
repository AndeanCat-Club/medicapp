import { Component, OnInit } from '@angular/core';
import { PersonService } from '../_services/person.service'
import { UtilService } from '../_services/utils.service';
import { ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { CreatePersonPage } from './create-person/create-person.page';
import { Person } from '../_types/person.types';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  pageTitle: string = 'Personas'
  persons: Person[] = []
  originalPersons: Person[] = [];

  loading = false

  constructor(private personService: PersonService, private utilService: UtilService, private actionSheetController: ActionSheetController, private modalController: ModalController) { }

  async ngOnInit() {
    this.loading = true;
    this.personService.listByUserId().subscribe((persons: any) => {
      this.loading = false
      if (persons.length) {
        this.persons = persons
        this.originalPersons = persons;
      }
    }, () => {
      this.loading = false
    })
  }

  calculateAge(birthDate: Date) {
    return this.utilService.calculateAge(birthDate)
  }

  calculateDate(date: Date) {
    return this.utilService.calculateDate(date)
  }

  searchPerson(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.persons = this.originalPersons.filter((person: Person) => {
      for (const key of Object.keys(person) as (keyof Person)[]) {
        const value = person[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }

  async createPerson() {
    const modal = await this.modalController.create({
      component: CreatePersonPage,
      cssClass: 'modals'
    });

    modal.onDidDismiss().then(modal => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  async options(person: Person) {
    console.log('person:', person)
    let option = person.status ? 'Desactivar' : 'Recuperar'

    const options = {
      header: 'Opciones',
      buttons: [
        {
          text: 'Actualizar información Médica',
          icon: 'clipboard-outline',
          handler: () => {

          }
        },
        {
          text: 'Ver Código QR',
          icon: 'qr-code-outline',
          handler: () => {

          }
        },
        {
          text: 'Editar persona',
          icon: 'id-card-outline',
          handler: () => {

          }
        },
        {
          text: option,
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            if (person.status == false) {
              //this.confirmDelete('recuperar', area);
            }
            else {
              //this.confirmDelete('borrar', area);
            }
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {

          }
        }]
    }

    const actionSheet = await this.actionSheetController.create(options);
    await actionSheet.present();
  }
}
