import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../_types/person.types';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private url: string = environment.host || 'http://localhost:8080';

    constructor(private http: HttpClient, private sessionService: SessionService) {
    }

    async insert(person: Person){    
        const sessionData = await this.sessionService.getSession()
        person.userId = sessionData.userId;
        person.status = true;
        return this.http.post<any[]>(`${this.url}/person/`, person, {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
        });
    }

    getPerson(person: Person){
        const personId = person._id;
        return this.http.get<any[]>(`${this.url}/person/${personId}`, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    getPersonByPublicCode(code: String){
        return this.http.get<Person>(`${this.url}/person/getPersonByPublicCode/${code}`, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    async listByUserId() {
        const sessionData = await this.sessionService.getSession()
        const userId = sessionData.userId;
        return this.http.get<any[]>(`${this.url}/person/listByUserId/${userId}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        });
    }

    changeStatus(person: Person){
        const personId = person._id;
        person.status = !person.status;
        return this.http.patch<any[]>(`${this.url}/person/${personId}`, person, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    update(personId: any, person: Person ){
        return this.http.patch<any[]>(`${this.url}/person/${personId}`, person, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    deletePerson(person: Person){
        const personId = person._id;
        return this.http.delete<any[]>(`${this.url}/person/${personId}`, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }

    generateNewPublicCode(personId: String){
        return this.http.post<any[]>(`${this.url}/person/changePublicCode/${personId}`, {}, {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        });
    }
}