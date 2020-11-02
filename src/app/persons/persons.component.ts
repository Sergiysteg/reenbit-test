import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from '../shared/interfaces/person.interface';
import { PersonService } from '../shared/services/person.service';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  phoneBook: Array<IPerson> = [];
  @Input() searchPerson: string; 
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.phoneBook = this.personService.phoneBook;
  }

  choosePerson(id: number): void {
    this.personService.changeCurrentPerson(id);
  }
}
