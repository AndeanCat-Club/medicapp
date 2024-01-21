import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { AddPostPage } from './add-post/add-post.page';
import { Pet } from 'src/app/_types/pet.types';
import { PetService } from 'src/app/_services/pet.service';
import { UtilService } from 'src/app/_services/utils.service';

interface LogBook{
  title: String,
  description: String
  isPublic: Boolean
  date: Date
  color: String

}

@Component({
  selector: 'app-update-logbook-pet',
  templateUrl: './update-logbook-pet.page.html',
  styleUrls: ['./update-logbook-pet.page.scss'],
})
export class UpdateLogbookPetPage implements OnInit {
  pet: Pet
  logBook: LogBook[] = [];
  loading = false;

  constructor(private alertController: AlertController, private utilService: UtilService, private toastController: ToastController, private petService: PetService, private modalController: ModalController, private navParams: NavParams) { 
    this.pet = navParams.get('param');
    if(this.pet.logBook){
      this.logBook = this.pet.logBook
    }
    console.log('pet:', this.pet);
  }

  async ngOnInit() {
   
  }

  async getPet(){
    this.loading = true;
    (await this.petService.getPet(this.pet)).subscribe((pet: any) => {
      this.pet = pet;
      if(this.pet.logBook){
        this.logBook = this.pet.logBook;
      }
      this.loading = false;
    } , err=> {
      this.loading = false;
    })
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

  async openModal(param?: any, index?: any) {
    const modal = await this.modalController.create({
      component: AddPostPage,
      cssClass: 'modals',
      componentProps: {
        param,
        index
      }
    });

    modal.onDidDismiss().then(modal => {
      this.getPet();
    });

    return await modal.present();
  }

  deleteLogbook(){

  }

  closeModal() {
    this.modalController.dismiss();
  }

  async toastDeleteSuccess() {
    const toast = await this.toastController.create({
      message: 'Publicación borrada de forma permanente',
      duration: 2000
    });
    toast.present();
  }

  async toastDeleteError() {
    const toast = await this.toastController.create({
      message: 'Error al borrar un publicación',
      duration: 2000
    });
    toast.present();
  }

  async confirmDelete(post: any, index: any) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: `Estás a punto de borrar una publicación, estás seguro? 😿😿`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletePost(index)
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePost(index: any){
    this.loading = true;
    this.pet.logBook.splice(index, 1);
     this.petService.update(this.pet._id, this.pet).subscribe(async (_) => {
      this.toastDeleteSuccess();
      await this.getPet()
    }, err => {
      this.toastDeleteError();
      this.loading = false;
    })
  }

  checkColor(color: String): Boolean{
    if(color == '#120d0d' || color == '#793FDF' ||  color == '#6499E9' || color == '#FF6868'){
      return true
    } 
    return false
  }

  calculateDate(date: Date) {
    return this.utilService.calculateDate(date)
  }

  checkPrivacy(isPublic: Boolean) {
    return isPublic ? 'Público' : 'Privado'
  }
}
