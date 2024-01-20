import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-logbook-pet',
  templateUrl: './update-logbook-pet.page.html',
  styleUrls: ['./update-logbook-pet.page.scss'],
})
export class UpdateLogbookPetPage implements OnInit {

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
  }

  async moreInfo(){
    const alert = await this.alertController.create({
      header: 'Sobre Nima!',
      message: 'Esta sección sirve como un muro o bitácora donde puedes ir guardando registros de tu mascota, puede ser pública o privada',
      buttons: [{
          text: 'Okay',
          handler: () => {
  
          }
        }
      ]
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
