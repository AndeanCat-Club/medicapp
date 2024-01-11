import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_types/user.types';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    private url: string = environment.host || 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    insert(user: User) {
        user.status = true
        user.isConfirmed = false
        return this.http.post<any[]>(`${this.url}/user/`, user, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        });
    }
}