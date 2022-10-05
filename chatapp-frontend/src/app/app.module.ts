import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ChatsComponent } from './home/chats/chats.component';
import { SocketService } from './shared/services/socket.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {ClipboardModule} from '@angular/cdk/clipboard'


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FilterPipeModule,
    ClipboardModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
