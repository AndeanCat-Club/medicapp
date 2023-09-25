import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private url: string = environment.host || 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    listByUserId() {
        const userId = '6501847489104e7bf51c4e01' // to do change this to a login
        return this.http.get<any[]>(`${this.url}/person/listByUserId/${userId}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        });
    }
}