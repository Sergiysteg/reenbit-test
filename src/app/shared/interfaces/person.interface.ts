import { IMessage } from "./message.interface";

export interface IPerson {
    id: number;
    firstName: string;
    lastName: string;
    messages: Array<IMessage>;
    photo: string;
}