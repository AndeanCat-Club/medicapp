import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, ActionSheetController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from 'src/app/_services/person.service';
import { Person } from 'src/app/_types/person.types';
import { UtilService } from '../../_services/utils.service';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'app-medic-information',
  templateUrl: './medic-information.page.html',
  styleUrls: ['./medic-information.page.scss'],
})
export class MedicInformationPage implements OnInit {
  pageTitle: string = 'Actualizar información médica'
  person: Person;
  originalPerson: any;

  bloodTypeEditing: boolean = false
  chronicConditionsEditing: boolean = false
  chronicConditions: any = []
  allergiesEditing: boolean = false
  allergies: any = []

  /* medications page */
  medicationsEditing: boolean = false //global (in category page)
  medications: any = []
  medicationPage = false;
  medicationEditing: boolean = false // local (in page)
  onEditionIndex: any = null
  /* */

  loading = true;
  isEditing = false;

  logoUrl = '';
  loadingImage = true;

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private toastController: ToastController, private navParams: NavParams, private alertController: AlertController, private modalController: ModalController, private personService: PersonService, private fileService: FileService) {
    this.person = navParams.get('param');
  }

  ngOnInit() {
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

    this.getPerson()
  }

  async getPerson() {
    console.log('me ejecuté')

    const result = await this.personService.getPerson(this.person)
    result.subscribe(result => {
      let finalPerson = this.buildPersonMedicalRecord(result)
      this.person = finalPerson as any
      this.originalPerson = finalPerson as any
      this.chronicConditions = JSON.parse(JSON.stringify(finalPerson.medicalRecord.chronicConditions))
      this.allergies = JSON.parse(JSON.stringify(finalPerson.medicalRecord.allergies))
      this.medications = JSON.parse(JSON.stringify(finalPerson.medicalRecord.medications))
      this.loading = false
    }, () => {
      this.loading = false
      this.toastError()
      this.closeModal();
    })
  }

  buildPersonMedicalRecord(person: any) {
    if (person.medicalRecord) {
      const medicalRecord = person.medicalRecord
      person.medicalRecord = {
        bloodType: medicalRecord.bloodType || '',
        allergies: medicalRecord.allergies || [],
        chronicConditions: medicalRecord.chronicConditions || [],
        medications: medicalRecord.medications || []
      }
    } else {
      person.medicalRecord = {
        bloodType: '',
        allergies: [],
        chronicConditions: [],
        medications: []
      }
    }

    return person
  }

  calculateAge(birthDate: Date) {
    return this.utilService.calculateAge(birthDate)
  }

  calculateDate(date: Date) {
    return this.utilService.calculateDate(date)
  }

  changeBloodTypeEditing() {
    this.bloodTypeEditing = !this.bloodTypeEditing
    this.isEditing = !this.isEditing
  }

  changeChronicConditionsEditing() {
    this.chronicConditionsEditing = !this.chronicConditionsEditing
    this.isEditing = !this.isEditing
  }

  changeAllergiesEditing() {
    this.allergiesEditing = !this.allergiesEditing
    this.isEditing = !this.isEditing
  }

  resetEditings() {
    this.isEditing = false

    this.chronicConditionsEditing = false
    this.bloodTypeEditing = false
    this.allergiesEditing = false
    this.medicationEditing = false
    this.onEditionIndex = null; 
  }

  addChronicCondition() {
    this.person.medicalRecord.chronicConditions.push('')
    this.chronicConditions.push('')
  }

  removeChronicCondition(index: number) {
    this.person.medicalRecord.chronicConditions.splice(index, 1)
    this.chronicConditions.splice(index, 1)
  }

  addAllergie(){
    this.person.medicalRecord.allergies.push('')
    this.allergies.push('')
  }

  removeAllergie(index: number){
    this.person.medicalRecord.allergies.splice(index, 1)
    this.allergies.splice(index, 1)
    }

  closeModal() {
    this.modalController.dismiss();
  }

  cancelUpdate() {
    this.resetEditings();
    this.loading = true;
    this.getPerson();
    this.loading = false;
  }

  async savePerson() {
    this.loading = true;
    this.changeBloodTypeEditing()
    this.person.medicalRecord.chronicConditions = this.chronicConditions
    this.person.medicalRecord.allergies = this.allergies
    this.personService.update(this.person._id, this.person).subscribe((_: any) => {
      this.ngOnInit();
      this.loading = false;
      this.toastSuccess();
      this.resetEditings()
    }, () => {
      this.ngOnInit();
      this.loading = false;
      this.toastError();
      this.resetEditings()
    })
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Persona actualizada correctamente 🎉🎉🎉',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error 🤔',
      duration: 2000
    });
    toast.present();
  }

  /* medicationPage */

  openMedicationPage(){
    this.medicationPage = true;
    this.pageTitle = 'Actualizar Medicamentos'
  }

  closeMedicationPage(){
    this.medicationPage = false;
    this.pageTitle = 'Actualizar información médica'
    this.resetEditings();
    this.loading = true;
    this.ngOnInit();
    
  }

  changeMedicationEditing(index: number){
    this.onEditionIndex = index;
    this.medicationEditing = !this.medicationEditing
  }

  addMedication(){
    this.person.medicalRecord.medications.unshift(
      {
      name: "",
      dosage: "",
      prescribedBy: "",
      startDate: "",
      endDate: ""
    })
    this.changeMedicationEditing(0)
  }

  removeMedication(index: number){
    this.person.medicalRecord.medications.splice(index, 1)
    this.savePerson()
  }

  async confirmDeleteMedication(index: number) {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de borrar un medicamento!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeMedication(index)
          }
        }
      ]
    });

    await alert.present();
  } 

  cancelUpdateMedication() {
    this.medicationPage = false;
    this.resetEditings();
    this.loading = true;
    this.ngOnInit();
    this.medicationPage = true
  }
}
