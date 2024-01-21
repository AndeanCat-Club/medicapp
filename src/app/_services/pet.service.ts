import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private url: string = environment.host || 'http://localhost:8080';

    constructor(private http: HttpClient, private sessionService: SessionService) {
    }

    async insert(pet: any){    
        const sessionData = await this.sessionService.getSession()
        pet.userId = sessionData.userId;
        pet.status = true;
        return this.http.post<any[]>(`${this.url}/pet/`, pet, {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
        });
    }

    async getPet(pet: any){
        const sessionData = await this.sessionService.getSession()
        const token = sessionData?.accessToken
        const petId = pet._id;
        this.sessionService.checkToken(token);
        return this.http.get<any[]>(`${this.url}/pet/${petId}`, {
            headers: new HttpHeaders()
            .set('Authorization' , `Bearer ${token}`)
            .set('Content-Type', 'application/json')
        });
    }

    getPetByPublicCode(code: String){
        return this.http.get<any>(`${this.url}/pet/getPetByPublicCode/${code}`, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    async listByUserId() {
        const sessionData = await this.sessionService.getSession()
        const userId = sessionData.userId;
        return this.http.get<any[]>(`${this.url}/pet/listByUserId/${userId}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        });
    }

    changeStatus(pet: any){
        const petId = pet._id;
        pet.status = !pet.status;
        return this.http.patch<any[]>(`${this.url}/pet/${petId}`, pet, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    update(petId: any, pet: any ){
        return this.http.patch<any[]>(`${this.url}/pet/${petId}`, pet, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    deletePet(pet: any){
        const petId = pet._id;
        return this.http.delete<any[]>(`${this.url}/pet/${petId}`, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    generateNewPublicCode(petId: String){
        return this.http.post<any[]>(`${this.url}/pet/changePublicCode/${petId}`, {}, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }
}
