import { IMessage } from '../interfaces/message.interface';

export class Message implements IMessage {
    constructor(public id: number,
                public message: string,
                public role: string,
                public date: Date){}
}