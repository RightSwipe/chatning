import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTES } from './shared/routes/auth.routes';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { CHAT_ROUTES } from './shared/routes/chat.routes';
import { ChatsComponent } from './home/chats/chats.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path:"auth",
    component:AuthLayoutComponent,
    children:AUTH_ROUTES
  },
  // {
  //   path:"chat",
  //   component:ChatLayoutComponent,
  //   children:CHAT_ROUTES
  // },
  {
    path:"",
    canActivate:[AuthGuard],
    component:ChatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
