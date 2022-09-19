import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  userData:any
  id : String = JSON.parse(JSON.stringify(localStorage.getItem("user_id"))!) 

  constructor(private _router:Router, private _dataService:DataService) {}

  ngOnInit(): void {
    this.getUserData();

  }

  async Logout(){
    await localStorage.removeItem("token")
    this._router.navigate(['/auth/login'])
  }
  getUserData(){
    this.userData = JSON.parse(JSON.stringify(localStorage.getItem('userData') ))
    console.log(this.userData.username)
  }

}
