import { Routes } from "@angular/router";

export const CHAT_ROUTES:Routes = [
 {
  path:"home",
  loadChildren:()=>import('./../../home/home.module').then((m)=>m.HomeModule)

 }

]