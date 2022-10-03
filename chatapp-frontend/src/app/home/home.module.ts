import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { ChatsComponent } from './chats/chats.component';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,


  ]
})
export class HomeModule { }
