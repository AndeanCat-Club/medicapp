import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms'
import { RecoverPasswordService } from '../../_services/recoverPassword.service';
import { AlertController, ToastController } from '@ionic/angular'

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  token: any;
  passwordForm: any;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private router: Router, private formBuilder:FormBuilder, private alertController: AlertController, private recoverPasswordService: RecoverPasswordService) {
    this.passwordForm = this.formBuilder.group({
      password:  ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]]
    });
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.queryParams['token']){
      this.activatedRoute.queryParams.subscribe( params =>{
        this.token = params['token']
        console.log('token:', this.token);
      }, err=> {
        this.toastError();
        this.navigateToLogin();
      })
    } else {
      this.toastError();
      this.navigateToLogin();
    }
  }


 async confirmUpdatePassword(){
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estás a punto de actualizar tu contraseña anterior',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.updatePasswordByRecover();
          }
        }
      ]
    });

    await alert.present();
  }

  async passwordChangedAlert(){
    const alert = await this.alertController.create({
      header: 'Enhorabuena!',
      message: 'Tu contraseña ha sido actualizada correctamente',
      buttons: [{
          text: 'Okay',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  updatePasswordByRecover(){
    const passwordForm = this.passwordForm.value;
    delete passwordForm.confirmPassword;
    this.recoverPasswordService.updateUserPassword(this.token,passwordForm).then(service =>{
      service.subscribe(result =>{
        this.navigateToLogin();
        this.toastSuccess();
      }, err => {
        this.toastError();
      });
    });
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada correctamente',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al intentar cambiar contraseña',
      duration: 2000
    });
    toast.present();
  }

  navigateToLogin(){
    this.router.navigate(['login'], {replaceUrl: true});
  }

  checkConfirmValue(){
    const password = this.passwordForm.get('password').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value
    return (password == confirmPassword) ? true : false
  }

}
