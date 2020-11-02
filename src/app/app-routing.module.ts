import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { PersonsComponent } from './persons/persons.component';


const routes: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  { path: 'persons', component: PersonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
