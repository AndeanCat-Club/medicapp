import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    calculateDate(currentDate: Date): string {
        const currentLocale = navigator.language || 'en-US';
        const date = new Date(currentDate,)
        return date.toLocaleString(currentLocale).split(',')[0]
      }
    
      calculateAge(dateOfBirth: Date): number {
        const currentDateOfBirth = new Date(dateOfBirth)
        const currentDate = new Date()
        const ageInMilliseconds = currentDate.getTime() - currentDateOfBirth.getTime()
        const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
        return Math.floor(ageInYears)
      }
}
