import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    calculateDate(currentDate: Date | undefined): string {
        const currentLocale = navigator.language || 'en-US';
        const date = new Date(currentDate || new Date())
        return date.toLocaleString(currentLocale).split(',')[0]
      }
    
      calculateAge(dateOfBirth: Date | undefined): number {
        const currentDateOfBirth = new Date(dateOfBirth || new Date())
        const currentDate = new Date()
        const ageInMilliseconds = currentDate.getTime() - currentDateOfBirth.getTime()
        const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
        return Math.floor(ageInYears)
      }
}
