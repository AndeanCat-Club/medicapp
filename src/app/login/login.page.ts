import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { SessionService } from '../_services/session.service';
import { ValidationService } from '../_services/validation.service';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private validationService: ValidationService, private router: Router, private toastController: ToastController, private authService: AuthService, private sessionService: SessionService, private eventService: EventService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validationService.emailValidator]],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {

  }

  login() {
    this.authService.logUser(this.loginForm.value).subscribe(result => {
      this.toastSuccess()
      this.sessionService.setSession(result)
      this.eventService.emitEventValue('isLoggedChanges',true)
      this.loginForm.reset();
      this.routeTo('person') 
    }, err => {
      this.toastError()
    })
  }

  loginGoogle(){
   this.authService.logToGoogle();
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
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
      message: 'Correo no existe o contraseña incorrecta',
      duration: 2000
    });
    toast.present();
  }
}
