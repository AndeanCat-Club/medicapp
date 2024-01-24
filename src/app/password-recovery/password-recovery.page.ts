import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { ValidationService } from '../_services/validation.service';
import { RecoverPasswordService } from '../_services/recoverPassword.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  emailForm: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private validatorService: ValidationService, private recoverPasswordService: RecoverPasswordService, private alertController: AlertController) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validatorService.emailValidator]],
    });
  }

  ngOnInit() {
  }

  requestInstruccions() {
    this.recoverPasswordService.sendUserIdentificator(this.emailForm.value).then(service => {
      service.subscribe(result => {
        this.succesAlert();
      }, err => {
        this.errorAlert();
      })
    }).catch(err => {
      this.errorAlert();
    });
  }

  async succesAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Solicitud de recuperación enviada con éxito',
      message: 'Revisa tu Bandeja de Entrada y la carpeta de Spam de tu correo electrónico.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }
      ]
    });
    await alert.present();
  }


  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Lo lamentamos',
      message: 'Ha ocurrido un error al momento de recuperar tu contraseña intenta más tarde',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }
      ]
    });
    await alert.present();
  }

  routeToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
