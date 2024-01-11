import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../_types/user.types';
import { AuthService } from '../_services/auth.service';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router: Router, private registerService: RegisterService, private toastController: ToastController,  private authService: AuthService, private sessionService: SessionService) { 
    this.registerForm = this.formBuilder.group({
      name : ['',[Validators.required]],
      phone : ['',[Validators.required]],
      email : ['',[Validators.required]],
      password : ['',Validators.required]
    }); 
  }

  ngOnInit() {
  }

  routeTo(route: string){
    this.router.navigate([`/${route}`])
  }

  async saveUser(){
    const user: User = this.registerForm.value
    this.registerService.insert(user).subscribe(value => {
      console.log('guardado')
      this.login(user);
      this.clearUser()
    }, err => {
      console.log('error', err)
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
      message: 'Error al registrar un usuario',
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
      this.routeTo('person') 
    }, err => {
      alert('Correo no existe o contraseña incorrecta')
    })
  }
}
