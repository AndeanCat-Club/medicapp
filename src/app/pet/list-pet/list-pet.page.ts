import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/_services/pet.service';
import { ModalController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdateImagePetPage } from './update-image-pet/update-image-pet.page';
import { UpdateLogbookPetPage } from './update-logbook-pet/update-logbook-pet.page';
import { QrPetPage } from './qr-pet/qr-pet.page';
import { UpdatePetPage } from './update-pet/update-pet.page';
type ComponentName = 'logBook' | 'update' | 'qr' | 'image'

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.page.html',
  styleUrls: ['./list-pet.page.scss'],
})
export class ListPetPage implements OnInit {
  loading = false;
  pets: any[] = [];
  activePets: any[] = []
  desactivatedPets: any[] = []
  originalPets: any[] = []
  firstCheck = false;

  constructor(private petService: PetService, private router: Router, private modalController: ModalController, private alertController: AlertController, private toastController: ToastController, private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.loading = true;
    const list = await this.petService.listByUserId()
    list.subscribe((pets: any[]) => {
      console.log(pets)
      if (pets.length) {
        this.firstCheck = false;
        this.activePets = pets.filter(pet => pet.status)
        this.desactivatedPets = pets.filter(pet => !pet.status)
        this.listActivePets()
      } else {
        this.firstCheck = true;
      }
      
      this.loading = false
    }, () => {
      this.loading = false
    })
  }

  listActivePets() {
    this.pets = this.activePets;
    this.originalPets = this.activePets;
    console.log(this.pets, this.originalPets)
  }

  listDesactivatedPets() {
    this.pets = this.desactivatedPets;
    this.originalPets = this.desactivatedPets;
  }

  searchPet(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.pets = this.originalPets.filter((pet: any) => {
      for (const key of Object.keys(pet) as (keyof any)[]) {
        const value = pet[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }

  async openModal(componentName: ComponentName, param?: any) {
    const components = {
      'update': UpdatePetPage,
      'logBook': UpdateLogbookPetPage,
      'qr': QrPetPage,
      'image': UpdateImagePetPage
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

  async options(pet: any) {
    let option: string = pet.status ? 'Archivar' : 'Desarchivar'

    const options = {
      header: 'Opciones',
      buttons: [
        {
          text: 'Ver Código QR',
          icon: 'qr-code-outline',
          handler: () => {
            this.openModal('qr', pet)
          }
        },
        {
          text: 'Bitácora - Perfil',
          icon: 'clipboard-outline',
          handler: () => {
            this.openModal('logBook', pet)
          }
        },
        {
          text: 'Editar mascota',
          icon: 'id-card-outline',
          handler: () => {
            this.openModal('update', pet)
          }
        },
        {
          text: 'Actualizar Imagen',
          icon: 'image-outline',
          handler: () => {
            this.openModal('image', pet)
          }
        },
        {
          text: option,
          role: 'destructive',
          icon: 'eye-off-outline',
          handler: () => {
            if (pet.status == false) {
              this.confirmDesactivation(option, pet);
            }
            else {
              this.confirmDesactivation(option, pet);
            }
          }
        },
        {
          text: 'Borrar permanente',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.confirmDelete(pet);
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

  async confirmDesactivation(option: string, pet: any) {
    const alert = await this.alertController.create({
      header: 'Confirma',
      message: `Estas a punto de ${option.toLowerCase()} una mascota 🙀🙀`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Okay',
          handler: () => {
            this.updatePetStatus(pet)
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(pet: any) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: `Estas a punto de borrar una mascota, esta acción será irreversible 😿😿!!!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletePet(pet)
          }
        }
      ]
    });

    await alert.present();
  }

  updatePetStatus(pet: any) {
    this.petService.changeStatus(pet).subscribe(result => {
      this.toastSuccess();
      this.ngOnInit();
    }, () => {
      this.toastError();
      this.ngOnInit();
    })
  }
  
  deletePet(pet: any) {
    this.petService.deletePet(pet).subscribe(result => {
      this.toastDeleteSuccess();
      this.ngOnInit();
    }, () => {
      this.toastDeleteError();
      this.ngOnInit();
    })
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Mascota archivada correctamente 😼😼',
      duration: 2000
    });
    toast.present();
  }
  
  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al archivar una mascota 🙀🙀',
      duration: 2000
    });
    toast.present();
  }
  
  async toastDeleteSuccess() {
    const toast = await this.toastController.create({
      message: 'Mascota borrada de forma permanente 😼😼',
      duration: 2000
    });
    toast.present();
  }
  
  async toastDeleteError() {
    const toast = await this.toastController.create({
      message: 'Error al borrar mascota 🙀🙀',
      duration: 2000
    });
    toast.present();
  }

}