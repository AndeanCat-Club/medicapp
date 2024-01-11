import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { SessionData } from '../_types/session.types';

@Injectable({
    providedIn: 'root'
})
export class InverseAuthGuard{

    constructor(private router: Router, private sessionService: SessionService) { }

    async canActivate(): Promise<boolean> {
        const session: SessionData = await this.sessionService.getSession()
        if(session) {
            this.routeTo('person')
            return false
        }
        
        return true
    }

    routeTo(route: string) {
        this.router.navigate([`/${route}`])
     }
}