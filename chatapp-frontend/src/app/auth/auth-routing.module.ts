import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"signup",
        component:SignupComponent
      },
      {
        path:"new-password",
        component:SetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
