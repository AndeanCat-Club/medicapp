import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController, private authService: AuthService, private sessionService: SessionService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {
    // const session = await this.sessionService.getSession()
    // if(session){
    //   this.routeTo('person')
    // }
  }

  login() {
    this.authService.logUser(this.loginForm.value).subscribe(result => {
      console.log('result:', result);
      this.toastSuccess()
      this.sessionService.setSession(result)
      this.routeTo('person') 
    }, err => {
      alert('Correo no existe o contraseña incorrecta')
    })
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
}
