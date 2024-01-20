import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavParams } from '@ionic/angular';
import { QrService } from 'src/app/_services/qr.service';
import { Pet } from 'src/app/_types/pet.types';
import { PetService } from 'src/app/_services/pet.service';

@Component({
  selector: 'app-qr-pet',
  templateUrl: './qr-pet.page.html',
  styleUrls: ['./qr-pet.page.scss'],
})
export class QrPetPage implements OnInit {
  pet: Pet
  loading: boolean = true
  loadingImage: boolean = false
  qrImageUrl = ''

  constructor(private toastController: ToastController, private qrService: QrService, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private petService: PetService) {
    this.pet = navParams.get('param');
   }

   ngOnInit() {
    this.loadingImage = true;
    const publicCode = this.pet.publicCode;
    this.generateCode(publicCode);
  }

  generateNewPublicCode(){
    this.petService.generateNewPublicCode(this.pet._id).subscribe((res => {
     this.getPet();
     this.generateCode(this.pet.publicCode);
    }), err=> {
     this.toastError()
    })
   }
 
   generateCode(publicCode: String | undefined){
    this.loadingImage = true;
    this.qrService.generateQrCodePet(publicCode).subscribe(res => {
      const blobUrl = URL.createObjectURL(res);
      this.qrImageUrl = blobUrl;
      this.loadingImage = false;
      this.loading = false;
    }, err => {
      this.loadingImage = false;
      this.loading = false;
      this.toastError()
    })
  }

  async getPet() {
    this.loading = true;
    const result = await this.petService.getPet(this.pet)
    result.subscribe((result: any) => {
      this.pet = result;
      this.loading = false
    }, () => {
      this.loading = false
      this.toastError()
    })
  }

  downloadQr() {
    const tempLink = document.createElement('a');
    tempLink.href = this.qrImageUrl;
    tempLink.target = '_blank';
    const fileName = `qr_${this.pet.name}_.png`;
    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  async moreInfo(){
    const alert = await this.alertController.create({
      header: 'Atención!',
      message: 'Este código sirve para compartir la información de tu Mascota... Siempre puedes actualizar el código en las opciones más abajo (El código anterior dejará de ser válido)',
      buttons: [{
          text: 'Okay',
          handler: () => {
  
          }
        }
      ]
    });

    await alert.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al generar un código, prueba mas tarde',
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
