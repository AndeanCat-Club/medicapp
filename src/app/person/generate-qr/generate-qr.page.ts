import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavParams } from '@ionic/angular';
import { QrService } from 'src/app/_services/qr.service';
import { Person } from 'src/app/_types/person.types';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {
  person: Person
  loading: boolean = true
  loadingImage: boolean = false
  qrImageUrl = ''

  constructor(private toastController: ToastController, private qrService: QrService, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private personService: PersonService) {
    this.person = navParams.get('param');
  }

  ngOnInit() {
    this.loadingImage = true;
    const publicCode = this.person.publicCode;
    this.generateCode(publicCode);
  }

  generateNewPublicCode(){
   this.personService.generateNewPublicCode(this.person._id).subscribe((res => {
    this.getPerson();
    this.generateCode(this.person.publicCode);
   }), err=> {
    this.toastError()
   })
  }

  generateCode(publicCode: String | undefined){
    this.loadingImage = true;
    this.qrService.generateQRCode(publicCode).subscribe(res => {
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

  async getPerson() {
    this.loading = true;
    const result = await this.personService.getPerson(this.person)
    result.subscribe((result: any) => {
      this.person = result;
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
    const fileName = `qr_${this.person.firstName}_.png`;
    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  async moreInfo(){
    const alert = await this.alertController.create({
      header: 'Atención!',
      message: 'Este código sirve para tú compartir información médica de manera pública... Siempre puedes actualizar el código en las opciones más abajo (El código anterior dejará de ser válido)',
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
