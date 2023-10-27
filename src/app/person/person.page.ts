import { Component, OnInit } from '@angular/core';
import { PersonService } from '../_services/person.service'
import { UtilService } from '../_services/utils.service';
import { ModalController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { CreatePersonPage } from './create-person/create-person.page';
import { UpdatePersonPage } from './update-person/update-person.page';
import { MedicInformationPage } from './medic-information/medic-information.page';
import { Person } from '../_types/person.types';


type ComponentName = 'create' | 'update' | 'information'


@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  pageTitle: string = 'Personas'
  persons: Person[] = []
  activePersons: Person[] = []
  desactivatedPersons: Person[] = []
  originalPersons: Person[] = []

  loading = false

  constructor(private personService: PersonService, private utilService: UtilService, private actionSheetController: ActionSheetController, private toastController: ToastController, private alertController: AlertController, private modalController: ModalController) { }

  async ngOnInit() {
    this.loading = true;
    this.personService.listByUserId().subscribe((persons: Person[]) => {
      
      if (persons.length) {
         
        this.activePersons = persons.filter( person => person.status)
        this.desactivatedPersons = persons.filter( person => !person.status)
        this.listActivePersons()
      }
      this.loading = false
    }, () => {
      this.loading = false
    })
  }

  listActivePersons() {
    this.persons = this.activePersons;
    this.originalPersons = this.activePersons;
  }

  listDesactivatedPersons() {
    this.persons = this.desactivatedPersons;
    this.originalPersons = this.desactivatedPersons;
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

  async openModal(componentName: ComponentName, param?: any) {
    const components = {
      'create': CreatePersonPage,
      'update': UpdatePersonPage,
      'information': MedicInformationPage
    }
    
    const modal = await this.modalController.create({
      component: components[componentName],
      cssClass: 'modals',
      componentProps: {
        param
      }
    });

    modal.onDidDismiss().then(modal => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  async options(person: Person) {
    console.log('person:', person)
    let option: string = person.status ? 'Desactivar' : 'Activar'

    const options = {
      header: 'Opciones',
      buttons: [
        {
          text: 'Ver Código QR',
          icon: 'qr-code-outline',
          handler: () => {

          }
        },
        {
          text: 'Actualizar información Médica',
          icon: 'clipboard-outline',
          handler: () => {
            this.openModal('information', person)
          }
        },
        {
          text: 'Editar persona',
          icon: 'id-card-outline',
          handler: () => {
            this.openModal('update', person)
          }
        },
        {
          text: option,
          role: 'destructive',
          icon: 'eye-off-outline',
          handler: () => {
            if (person.status == false) {
              this.confirmDesactivation(option, person);
            }
            else {
              this.confirmDesactivation(option, person);
            }
          }
        },
        {
          text: 'Borrar permanente',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.confirmDelete(person);
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

  async confirmDesactivation(option: string, person: Person) {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: `Estas a punto de ${option} una persona!!!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.updatePersonStatus(person)
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(person: Person) {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: `Estas a punto de borrar una persona, esta acción será irreversible!!!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.deletePerson(person)
          }
        }
      ]
    });

    await alert.present();
  }

  updatePersonStatus(person: Person){
    this.personService.changeStatus(person).subscribe(result => {
      this.toastSuccess();
      this.ngOnInit();
    }, () => {
      this.toastError();
      this.ngOnInit();
    })
  }

  deletePerson(person: Person){
    this.personService.deletePerson(person).subscribe(result => {
      this.toastDeleteSuccess();
      this.ngOnInit();
    }, () => {
      this.toastDeleteError();
      this.ngOnInit();
    })
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Persona desactivada correctamente',
      duration: 2000
    });
    toast.present();
  }
  
  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al desactivar persona',
      duration: 2000
    });
    toast.present();
  }

  async toastDeleteSuccess() {
    const toast = await this.toastController.create({
      message: 'Persona borrada de forma permanente',
      duration: 2000
    });
    toast.present();
  }

  async toastDeleteError() {
    const toast = await this.toastController.create({
      message: 'Error al borrar persona',
      duration: 2000
    });
    toast.present();
  }
}
