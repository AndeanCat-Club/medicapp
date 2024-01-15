import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PersonService } from '../_services/person.service';
import { Person } from '../_types/person.types';
import { UtilService } from '../_services/utils.service';
import { FileService } from '../_services/file.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.page.html',
  styleUrls: ['./medical-record.page.scss'],
})
export class MedicalRecordPage implements OnInit {
  codePerson: string | undefined;
  loading: boolean = false;
  person: Person | undefined;
  loadingImage = true;
  logoUrl = '';

  constructor(private route: ActivatedRoute, private toastController: ToastController, private personService: PersonService, private utilService: UtilService, private fileService: FileService) { 
    if(this.route.snapshot.queryParams['code']){
      this.route.queryParams.subscribe( params =>{
        this.codePerson = params['code'];
        if(this.codePerson){
          this.personService.getPersonByPublicCode(this.codePerson).subscribe((res: Person) => {
            this.person = res;
            const filePath = this.person?.imageData?.filePath || null
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

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error: Código QR no válido o desactualizado',
      duration: 2000
    });
    toast.present();
  }

  getPersonByPublicCode(){

  }

  calculateAge(birthDate: Date | undefined) {
    return this.utilService.calculateAge(birthDate)
  }

  calculateDate(date: Date | undefined) {
    return this.utilService.calculateDate(date)
  }

}
