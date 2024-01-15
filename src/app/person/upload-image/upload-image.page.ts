import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { PersonService } from 'src/app/_services/person.service';
import { FileService } from 'src/app/_services/file.service';
import { Person, ImageData } from 'src/app/_types/person.types';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  originalUrl: String = '';
  logoUrl: String | ArrayBuffer = '';
  form: FormData | null = null;
  person: Person
  loading = false;

  constructor(private toastController: ToastController, private navParams: NavParams, private alertController: AlertController, private modalController: ModalController, private personService: PersonService, private fileService: FileService) {
    this.person = navParams.get('param');
  }

  ngOnInit() {
    this.loading = true;
    const filePath = this.person?.imageData?.filePath || null
    console.log('filePath:', filePath);
    if (filePath) {
      this.fileService.readFile(filePath).subscribe((file: any) => {
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          this.originalUrl = blobUrl;
          this.logoUrl = blobUrl;
          this.loading = false;
        }
      }, err => {
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
  }

  readSingleFile(e: any) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    console.log('e:', e);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (evento: any) => {
      try {
        const pre = evento.target["result"];
        this.logoUrl = pre;
        const formData = new FormData();
        // const type = file.type.split('/')
        formData.append('file', file);
        formData.append('folder', `${this.person.userId.toString()}/persons/${this.person._id}`);

        this.form = formData;
      } catch (error) {
        console.log('err:', error)
        this.toastError();
      }
    }
  }

  async confirmUpdate() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de actualizar la imagen de la persona!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Continuar',
          handler: () => {
            this.updatePage();
          }
        }
      ]
    });

    await alert.present();
  }

  updatePage() {
    this.loading = true;
    if (this.form) {
      this.fileService.sendFile(this.form).subscribe(value => {
        const person = this.person;
        const imageData: ImageData = {filePath: value.filePath.toString()}
        
        person['imageData'] = imageData;
        this.personService.update(this.person._id, person).subscribe(res => {
          this.loading = false;
          this.form = null;
          this.toastSuccess();
          this.ngOnInit();
        }, err=> {
          this.loading = false;
          this.toastError();
        })
      }, err=> {
        this.loading = false;
        this.toastError();
      })
    }
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Imagen actualizada correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al actualizar imagen 🤔',
      duration: 2000
    });
    toast.present();
  }

  cancelUpdate() {
    this.logoUrl = this.originalUrl;
    this.form = null;
    this.ngOnInit();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

