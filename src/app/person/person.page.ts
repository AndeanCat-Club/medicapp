import { Component, OnInit } from '@angular/core';
import { PersonService } from '../_services/person.service'
import { UtilService } from '../_services/utils.service';

interface Person {
  firstName: String
  middleName?: String
  lastName: String
  secondLastName?: String
  emergencyContact?: String
  birthDate: Date
  rut: String
  status: Boolean
  medicalRecord: Object
  userId: String
}

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  pageTitle: string = 'Persona'
  persons : Person[] = []
  originalPersons: Person[] = [];

  loading = true

  constructor(private personService: PersonService, private utilService: UtilService) { }

  async ngOnInit() {
    this.personService.listByUserId().subscribe((persons: any) => {
      if(persons.length){
        this.persons = persons
        this.originalPersons = persons;
      }
    })
  }

  calculateAge(birthDate: Date){
    return this.utilService.calculateAge(birthDate)
  }

  calculateDate(date: Date){
    return this.utilService.calculateDate(date)
  }

  searchPerson(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.persons = this.originalPersons.filter((person: Person) => {
      for (const key of Object.keys(person) as (keyof Person)[]) {
        const value = person[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }

}
