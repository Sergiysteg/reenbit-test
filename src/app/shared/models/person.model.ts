import { IPerson } from '../interfaces/person.interface';
import { IMessage } from '../interfaces/message.interface';
export class Person implements IPerson {
    constructor(public id: number,
                public firstName: string,
                public lastName: string,
                public messages: Array<IMessage>,
                public photo: string,
                public unreadStatus: boolean){}
}