import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, ActionSheetController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
})

export class CreatePersonPage implements OnInit {
  pageTitle: string = 'Agregar Persona'
  personForm;
  loadingButton = false;
  maxTime = new Date().toISOString()

  constructor(private formBuilder: FormBuilder, private personService: PersonService, private modalController: ModalController, private alertController: AlertController, private toastController: ToastController) {
    this.personForm = this.formBuilder.group({
      firstName : ['',[Validators.required]],
      middleName : [''], 
      lastName: ['', [Validators.required]],
      secondLastName: [''],
      emergencyContact: [''],
      birthDate: [new Date().toISOString()],
      rut: ['', [Validators.required]]
    }); 
  }

  ngOnInit() {
  }

  async confirmCreate() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de agregar una Persona!!!',
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
            this.savePerson();
          }
        }
      ]
    });

    await alert.present();
  } 

  async savePerson(){
    this.loadingButton = true;
    const person: any = this.personForm.value;
    this.personService.insert(person).subscribe((_: any) =>{
      this.loadingButton = false;
      this.personForm.reset();
      this.toastSuccess();
      this.closeModal();
    }, () => {
      this.loadingButton = false;
      this.toastError();
    })
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Persona agregada correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }
  
  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al agregar persona, error de conexión probablemente 🤔',
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
