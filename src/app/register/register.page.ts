import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { User } from '../_types/user.types';
import { AuthService } from '../_services/auth.service';
import { SessionService } from '../_services/session.service';
import { ValidationService } from '../_services/validation.service';
import { EventService } from '../_services/event.service';
import { PrivacyPage } from '../privacy/privacy.page';
import { TermsPage } from '../terms/terms.page';

type ComponentName = 'privacy' | 'terms'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isEmailForm = false;

  constructor(private formBuilder:FormBuilder, private eventService: EventService, private router: Router, private validationService: ValidationService, private registerService: RegisterService, private toastController: ToastController, private modalController: ModalController, private authService: AuthService, private sessionService: SessionService) { 
    this.registerForm = this.formBuilder.group({
      name : ['',[Validators.required]],
      phone : ['',[Validators.required]],
      email : ['',[Validators.required, this.validationService.emailValidator]],
      password : ['',Validators.required],
      aceptTerms: [false, Validators.required]
    }); 
  }

  ngOnInit() {
  }

  routeTo(route: string){
    this.router.navigate([`/${route}`])
    this.isEmailForm = false;
  }

  async saveUser(){
    const form = this.registerForm.value;
    delete form.aceptTerms
    const user: User = this.registerForm.value

    this.registerService.insert(user).subscribe(value => {
      console.log('guardado')
      this.login(user);
      this.clearUser()
    }, err => {
      console.log('error', err)
      this.toastError();
    })
  }

  clearUser(){
    this.registerForm.reset();
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Sesión iniciada correctamente',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Error al registrar un usuario, puede que ese correo ya esté regístrado',
      duration: 2000
    });
    toast.present();
  }


  login(user: User) {
    const loginForm = {email: user.email, password: user.password}
    this.authService.logUser(loginForm).subscribe(result => {
      console.log('result:', result);
      this.toastSuccess()
      this.sessionService.setSession(result)
      this.eventService.emitEventValue('isLoggedChanges',true)
      this.routeTo('person') 
    }, err => {
      alert('Correo no existe o contraseña incorrecta')
    })
  }

  async openModal(componentName: ComponentName, param?: any) {
    const components = {
      'privacy': PrivacyPage,
      'terms': TermsPage,
    }

    const modal = await this.modalController.create({
      component: components[componentName],
      cssClass: 'modals',
      componentProps: {
        param
      }
    });

    modal.onDidDismiss().then(modal => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  changeEmailForm(status: boolean){
    this.isEmailForm = status;
  }

  loginGoogle(){
    this.authService.logToGoogle();
   }
}
