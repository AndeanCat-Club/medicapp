import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionData } from 'src/app/_types/session.types';

@Injectable()

export class AuthService {

    private url: string = environment.host;

    constructor(private http: HttpClient) { }

    logUser(logData: Object) {
        return this.http.post<SessionData>(`${this.url}/auth/`, logData, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}