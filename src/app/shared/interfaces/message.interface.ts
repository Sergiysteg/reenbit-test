import { RouterModule } from '@angular/router';
export interface IMessage {
    id: number;
    message: string;
    role: string;
    // senderRole: string;
    // senderRole: senderRole;
    date: Date;
}

// export enum senderRole {
//     user = 1,
//     friend = 2
// }