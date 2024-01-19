import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, ActionSheetController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { PetService } from 'src/app/_services/pet.service';
import { Pet } from 'src/app/_types/pet.types';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetPage implements OnInit {
  petForm: any;
  ownerForm: any;
  loadingButton = false;
  maxTime = new Date().toISOString()
  pet: Pet

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private navParams: NavParams, private alertController: AlertController, private modalController: ModalController, private petService: PetService) {

    this.pet = navParams.get('param');

    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: [''],
      species: ['',],
      birthDate: [new Date().toISOString()],
      description: ['']
    });

    this.ownerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      emergencyContact: ['', [Validators.required]],
      social: [''],
      address: ['']
    })

    if (this.pet) {
      this.startForm(this.pet)
      this.startOwnerForm(this.pet.owner)
    }
  }

  ngOnInit() {
  }

  startForm(pet: any) {
    for (let index in pet) {
      if (this.petForm.controls[index]) {
        this.petForm.controls[index].setValue(pet[index]);
      }
    }
  }

  startOwnerForm(petOwner: any) {
    for (let index in petOwner) {
      if (this.ownerForm.controls[index]) {
        this.ownerForm.controls[index].setValue(petOwner[index]);
      }
    }
  }

  async confirmUpdate() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de actualizar una Mascota!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.savePet();
          }
        }
      ]
    });

    await alert.present();
  }

  async savePet() {
    this.loadingButton = true;
    const petObj = { ...this.petForm.value, owner: this.ownerForm.value }
    this.petService.update(this.pet._id, petObj).subscribe((_: any) => {
      this.loadingButton = false;
      this.petForm.reset();
      this.ownerForm.reset();
      this.toastSuccess();
      this.closeModal();
    }, () => {
      this.loadingButton = false;
      this.toastError();
    })
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Persona actualizada correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al actualizar persona 🤔',
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
