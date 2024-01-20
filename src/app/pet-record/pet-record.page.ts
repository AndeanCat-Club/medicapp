import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PetService } from '../_services/pet.service';
import { Pet } from '../_types/pet.types';
import { UtilService } from '../_services/utils.service';
import { FileService } from '../_services/file.service';

@Component({
  selector: 'app-pet-record',
  templateUrl: './pet-record.page.html',
  styleUrls: ['./pet-record.page.scss'],
})
export class PetRecordPage implements OnInit {
  codePet: string | undefined;
  loading: boolean = false;
  pet: Pet | undefined;
  loadingImage = true;
  logoUrl = '';

  constructor(private route: ActivatedRoute, private toastController: ToastController, private petService: PetService, private utilService: UtilService, private fileService: FileService) { 
    if(this.route.snapshot.queryParams['code']){
      this.route.queryParams.subscribe( params =>{
        this.codePet = params['code'];
        if(this.codePet){
          this.petService.getPetByPublicCode(this.codePet).subscribe((res: Pet) => {
            this.pet = res;
            const filePath = this.pet?.imageData?.filePath || null
            this.toastSuccess();
            if (filePath) {
              this.fileService.readFile(filePath).subscribe((file: any) => {
                if (file) {
                  const blobUrl = URL.createObjectURL(file);
                  this.logoUrl = blobUrl;
                  this.loadingImage = false;
                }
              }, err => {
                this.loadingImage = false;
              })
            } else {
              this.loadingImage = false;
            }
          }, err=> {
            this.toastError();
          })
        }
      })
    }
  }

  ngOnInit() {
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Mascota escaneada correctamente',
      duration: 2000
    });
    toast.present();
  }


  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error: Código QR no válido o desactualizado',
      duration: 2000
    });
    toast.present();
  }

}
