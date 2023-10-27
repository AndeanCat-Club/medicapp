import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, ActionSheetController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms';
import { PersonService } from 'src/app/_services/person.service';
import { Person } from 'src/app/_types/person.types';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.page.html',
  styleUrls: ['./update-person.page.scss'],
})
export class UpdatePersonPage implements OnInit {
  pageTitle: string = 'Actualizar Persona'
  personForm: any;
  loadingButton = false;
  maxTime = new Date().toISOString()
  person: Person

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private navParams: NavParams, private alertController: AlertController, private modalController: ModalController, private personService: PersonService) { 
    this.person = navParams.get('param');

    this.personForm = this.formBuilder.group({
      firstName : ['',[Validators.required]],
      middleName : [''], 
      lastName: ['', [Validators.required]],
      secondLastName: [''],
      emergencyContact: [''],
      birthDate: [new Date().toISOString()],
      rut: ['', [Validators.required]]
    }); 

    if (this.person) {
      this.startForm(this.person)
    }
  }

  ngOnInit() {
  }

  startForm(person: any){
    for(let index in person){
      if(this.personForm.controls[index]){
        this.personForm.controls[index].setValue(person[index]);
      }                    
    }
  }

  async confirmUpdate() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de actualizar una Persona!!!',
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
    this.personService.update(this.person._id, this.personForm.value).subscribe((_: any) => {
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
