import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PetService } from 'src/app/_services/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  animationError = false;
  petForm;
  ownerForm;
  descriptionForm
  loadingCreation = false;

  step = 0;

  constructor(private formBuilder: FormBuilder, private router: Router, private petService: PetService, private toastController: ToastController) { 
    this.petForm = this.formBuilder.group({
      name : ['',[Validators.required]],
      species : ['', [Validators.required]], 
      age: ['']
    }); 

    this.ownerForm = this.formBuilder.group({
      name : ['',[Validators.required]],
      emergencyContact : ['', [Validators.required]], 
      address: [''],
      social: []
    }); 

    this.descriptionForm = this.formBuilder.group({
      description : ['',],
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.animationError = false
    }, 500)
  }

  nextSlider(){
      const swiperEl: any = document.querySelector('swiper-container');
      swiperEl.swiper.slideNext();
  }

  previuosSlider(){
    const swiperEl: any = document.querySelector('swiper-container');
    swiperEl.swiper.slidePrev()
  }

  async createPet(){
    if(!this.petForm.valid || !this.ownerForm.valid){
      this.formError(this.petForm.valid ? 'Pantalla Naranja' : 'Pantalla Morada');
    } else {
      this.loadingCreation = true
      const combinedObject = {
        ...this.petForm.value,
        owner: this.ownerForm.value,
        ...this.descriptionForm.value
      };
      const insertPet = await this.petService.insert(combinedObject)
      insertPet.subscribe((_: any) => {
        this.loadingCreation = false
        this.toastSuccess();
        this.routeTo('pet/list-pet')
      }, () => {
        this.loadingCreation = false;
        this.toastError();
        this.routeTo('pet')
      })
    }
  }

  async formError(message: string) {
    const toast = await this.toastController.create({
      message: `Aún hay campos sin rellenar en la ${message}`,
      duration: 2000
    });
    toast.present();
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Mascota agregada correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }
  
  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al agregar mascota, error de conexión probablemente, prueba mas tarde 🤔',
      duration: 2000
    });
    toast.present();
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`], {replaceUrl: true})
  }
}
