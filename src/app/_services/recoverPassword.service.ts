import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class RecoverPasswordService {

  private url: string = environment.host;

  constructor(private http: HttpClient) { }

  async sendUserIdentificator(email: string){  
    return this.http.post<any[]>(`${this.url}/user/passwordRecovery/`, email, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  async updateUserPassword(token: string, passwordForm: any){
    const passwordRequestValues = {
      token: token,
      newPassword: passwordForm.password
    }

    return this.http.post<any[]>(`${this.url}/user/newPasswordByToken`, passwordRequestValues, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}