import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { IPerson } from '../shared/interfaces/person.interface';
import { PersonService } from '../shared/services/person.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chat', {static: false}) myChat: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  currentPerson: IPerson;
  text: string;
  answer: any;
  search: string;

  constructor(private personService: PersonService,
              private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getFirstPerson();
    this.checkUser();
  }
  ngAfterViewInit(): void {
    this.scrollContainer = this.myChat.nativeElement;
    this.itemElements.changes.subscribe(() => this.onItemelementChanged());
  }

  private onItemelementChanged(): void {
    this.scrollToBottom();
  }

  private getFirstPerson(): void {
    this.currentPerson = this.personService.phoneBook[0];
  }

  private checkUser(): void {
    this.personService.watchPerson.subscribe(() => {
      this.getCurrentUser();
    });
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      l: 0,
      behavior: 'smooth'
    });
  }

  private getCurrentUser(): void {
    this.currentPerson = this.personService.currentPerson;
    // this.myChat.nativeElement.scrollTop = this.myChat.nativeElement.offsetHeight;
  }

  public sendMessage(): void {
    if(this.text){
      const newMessage = {
        id: 3,
        message: this.text,
        role: 'user',
        date: new Date()
      }
      this.personService.sendMessage(newMessage);
      this.personService.getJoke().subscribe((data) => {
        this.viewJoke(data, this.currentPerson.id);
      });
      this.text = '';
    }
  }

  private viewJoke(data: any, id: number): void {
    this.personService.viewJoke(data, id);
  }
}
