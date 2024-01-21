import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PetService } from 'src/app/_services/pet.service';
import { Pet } from 'src/app/_types/pet.types';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  postForm: any;
  loadingButton = false;
  maxTime = new Date().toISOString()
  pet: Pet
  index;
  post: any;

  constructor(private alertController: AlertController, private toastController: ToastController, private navParams: NavParams, private modalController: ModalController, private formBuilder: FormBuilder, private petService: PetService) { 
    this.postForm = this.formBuilder.group({
      title : ['',[Validators.required]],
      description : [''], 
      date: [new Date().toISOString(), [Validators.required]],
      isPublic: [false, [Validators.required]],
      color: ['#DCFFB7']
    }); 
    
    this.pet = navParams.get('param');
    this.index = navParams.get('index');
    console.log('pet:', this.pet)
    console.log('index:', this.index)
    if(this.index || this.index == 0){
      this.post = this.pet.logBook[this.index]
      this.startPost()
    }
  }

  startPost(){
    for (let key in this.post) {
      if (this.postForm.controls[key]) {
        this.postForm.controls[key].setValue(this.post[key]);
      }
    }
  }

  savePost(){
    this.loadingButton = true;
    const post = this.postForm.value;
    const pet = this.pet;
    pet.logBook.unshift(post)
    this.petService.update(pet._id, pet).subscribe(() => {
      this.loadingButton = false;
      this.postForm.reset();
      this.closeModal()
    }, err=>{
      this.loadingButton = false;
      this.postForm.reset();
      this.closeModal()
    })
  }

  ngOnInit() {
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Publicación agregado correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }
  
  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al agregar publicación, error de conexión probablemente 🤔',
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
