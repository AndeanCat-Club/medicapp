import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SessionService } from '../_services/session.service';
import { EventService } from '../_services/event.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-external',
  templateUrl: './login-external.page.html',
  styleUrls: ['./login-external.page.scss'],
})
export class LoginExternalPage implements OnInit {
  loading = false;
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController, private authServices: AuthService, private sessionService: SessionService, private eventService: EventService) {
    
   }

  ngOnInit() {
    this.loading = true;
    if(this.route.snapshot.queryParams['code']){
      this.route.queryParams.subscribe( params =>{
        const token = params['code'];

        this.authServices.logExternal(token).subscribe((result)=> {
          this.sessionService.setSession(result)
          this.eventService.emitEventValue('isLoggedChanges', true)
          this.loading = false;
          this.toastSuccess();
          this.routeTo('person')
        }, err=> {
          this.toastError();
          this.routeTo('login')
          this.loading = false;
        })
      }, err=> {
        this.toastError();
        this.routeTo('login')
        this.loading = false;

      })
    } else {
      this.toastError();
      this.routeTo('login')
      this.loading = false;  
    }
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
      message: 'Error al iniciar sesión. Por favor inténtalo más tarde',
      duration: 2000
    });
    toast.present();
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }
}
