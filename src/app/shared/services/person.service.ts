import { Injectable } from '@angular/core';
import { IPerson } from '../interfaces/person.interface';
import { IMessage } from '../interfaces/message.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url: string;
  answer: any;
  watchPerson: Subject<string> = new Subject<string>();
  phoneBook: Array<IPerson> = [
    { id: 1,
      firstName: 'Petro',
      lastName: 'Petriv',
      messages: [
        { id: 6,
          message: 'My name is Inigo Montonia, you kill my father, prepare to die!',
          role: "friend",
          date: new Date('October 22, 10:40')
        },
        { id: 7,
          message: "No body can't swim, you can not swim",
          role: "user",
          date: new Date('October 22 2020, 10:42')
        },
        { id: 8,
          message: 'Prepare for battle',
          role: "friend",
          date: new Date('October 22 2020, 10:43')
        },
        { id: 9,
          message: 'Hello World!',
          role: "friend",
          date: new Date('October 22 2020, 10:45')
        },
        { id: 10,
          message: 'Some other text',
          role: "user",
          date: new Date('October 22 2020, 10:50')
        },
      ],
      photo: 'https://img.favpng.com/7/12/14/silhouette-avatar-computer-icons-png-favpng-QraegZsLrXk3JinMGcXgweMB4.jpg'
    },
    { id: 2,
      firstName: 'Oksana',
      lastName: 'Oksanivna',
      messages: [
        { id: 11,
          message: 'Hello, my name is Oksana',
          role: "friend",
          date: new Date('October 25 2020, 10:50')
        },
        { id: 12,
          message: "Hi Oksana",
          role: "user",
          date: new Date('October 25 2020, 10:52')
        },
        { id: 13,
          message: 'My name is user',
          role: "user",
          date: new Date('October 25 2020, 10:53')
        },
        { id: 14,
          message: 'Is this the end?',
          role: "friend",
          date: new Date('October 25 2020, 10:55')
        },
        { id: 15,
          message: 'Yes my dear friend',
          role: "user",
          date: new Date('October 25 2020, 11:50')
        },
      ],
      photo: 'https://img.favpng.com/5/17/10/female-diana-prince-organization-png-favpng-309L75Lp0a4fc4cKSYNhXstAt.jpg'
    },
    { id: 4,
      firstName: 'Ivan',
      lastName: 'Ivaniv',
      messages: [
        { id: 21,
          message: 'My name is Inigo Montonia, you kill my father, prepare to die!',
          role: "friend",
          date: new Date('October 26, 10:40')
        },
        { id: 22,
          message: "No body can't swim, you can not swim",
          role: "user",
          date: new Date('October 26 2020, 10:42')
        },
        { id: 23,
          message: 'Prepare for battle',
          role: "friend",
          date: new Date('October 26 2020, 10:43')
        },
        { id: 24,
          message: 'Hello World!',
          role: "friend",
          date: new Date('October 26 2020, 10:45')
        },
        { id: 25,
          message: 'Some other text',
          role: "user",
          date: new Date('October 26 2020, 10:50')
        },
      ],
      photo: 'https://img.favpng.com/7/12/14/silhouette-avatar-computer-icons-png-favpng-QraegZsLrXk3JinMGcXgweMB4.jpg'
    },
    { id: 3,
      firstName: 'Maria',
      lastName: 'Marianiv',
      messages: [
        { id: 16,
          message: 'Hello, my name is Oksana',
          role: "friend",
          date: new Date('November 1 2020, 2:50')
        },
        { id: 17,
          message: "Hi Oksana",
          role: "user",
          date: new Date('November 1 2020, 2:55')
        },
        { id: 18,
          message: 'My name is user',
          role: "user",
          date: new Date()
        },
        { id: 19,
          message: 'Is this the end?',
          role: "friend",
          date: new Date('November 1 2020, 3:00')
        },
        { id: 20,
          message: 'Yes my dear friend',
          role: "user",
          date: new Date('November 1 2020, 3:02')
        }
      ],
      photo: 'https://img.favpng.com/5/17/10/female-diana-prince-organization-png-favpng-309L75Lp0a4fc4cKSYNhXstAt.jpg'
    }
  ];
  currentPerson: IPerson = this.phoneBook[0];
  constructor(private afStorage: AngularFireStorage,
              private http: HttpClient) {
    this.url = 'https://api.chucknorris.io/jokes/random';
  }

  getJoke(): Observable<any> {
    return this.http.get(this.url);
  }

  sendMessage(message: IMessage): void {
    this.currentPerson.messages.push(message);
    const index = this.phoneBook.findIndex(user => user.id === this.currentPerson.id);
    this.phoneBook.splice(index, 1, this.currentPerson);
    this.watchPerson.next('something changes');
  }

  getImages(): void {
    
  }

  changeCurrentPerson(id: number): void {
    this.currentPerson = this.phoneBook.find(person => person.id === id);
    this.watchPerson.next('something changes');
  }
}
