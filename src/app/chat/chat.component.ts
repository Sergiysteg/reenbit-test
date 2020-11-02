import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { IPerson } from '../shared/interfaces/person.interface';
import { PersonService } from '../shared/services/person.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chat') myChat: ElementRef;
  watchPerson: Subject<IPerson> = new Subject<IPerson>();
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

  getFirstPerson(): void {
    this.currentPerson = this.personService.phoneBook[0];
  }

  private checkUser(): void {
    this.personService.watchPerson.subscribe(() => {
      this.getCurrentUser();
    });
  }

  getCurrentUser(): void {
    this.currentPerson = this.personService.currentPerson;
    this.myChat.nativeElement.scrollTop = this.myChat.nativeElement.scrollHeight;
  }

  sendMessage(): void {
    if(this.text){
      const newMessage = {
        id: 3,
        message: this.text,
        role: 'user',
        date: new Date()
      }
      this.personService.sendMessage(newMessage);
      this.personService.getJoke().subscribe(data => {
        this.answer = data;
      });
      this.text = '';
      this.myChat.nativeElement.scrollTop = this.myChat.nativeElement.scrollHeight;
      this.viewJoke();
    }
  }

  viewJoke(): void {
    setTimeout(() => {
      const chuckAnswer = {
        id: 10,
        message: this.answer.value,
        role: 'friend',
        date: new Date()
      };
      this.currentPerson.messages.push(chuckAnswer);
      this.myChat.nativeElement.scrollTop = this.myChat.nativeElement.scrollHeight;
    }, 5000)
  }
}
