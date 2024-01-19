import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { PetService } from 'src/app/_services/pet.service';
import { FileService } from 'src/app/_services/file.service';
import { Pet, ImageData } from 'src/app/_types/pet.types';

@Component({
  selector: 'app-update-image-pet',
  templateUrl: './update-image-pet.page.html',
  styleUrls: ['./update-image-pet.page.scss'],
})
export class UpdateImagePetPage implements OnInit {
  originalUrl: String = '';
  logoUrl: String | ArrayBuffer = '';
  form: FormData | null = null;
  pet: Pet
  loading = false;

  constructor(private toastController: ToastController, private navParams: NavParams, private alertController: AlertController, private modalController: ModalController, private petService: PetService, private fileService: FileService) {
    this.pet = navParams.get('param');
  }

  ngOnInit() {
    this.loading = true;
    const filePath = this.pet?.imageData?.filePath || null
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
        formData.append('folder', `${this.pet.userId.toString()}/pets/${this.pet._id}`);

        this.form = formData;
      } catch (error) {
        console.log('err:', error)
        this.toastError();
      }
    }
  }

  async confirmUpdate() {
    const alert = await this.alertController.create({
      header: 'Hola!',
      message: 'Confirma si deseas actualizar la imagen de tu mascota 😺',
      buttons: [
        {
          text: 'Cancelar 😿',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Continuar 😸',
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
        const pet = this.pet;
        const imageData: ImageData = {filePath: value.filePath.toString()}
        
        pet['imageData'] = imageData;
        this.petService.update(this.pet._id, pet).subscribe(res => {
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
      message: 'Imagen de tu mascota actualizada correctamente 😻😻🎉',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Disculpa😿!: Error al actualizar la imagen de tu mascota 😿😿😿😿 itenta mas tarde',
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