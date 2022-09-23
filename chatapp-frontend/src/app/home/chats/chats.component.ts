import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { SocketService } from 'src/app/shared/services/socket.service';

const SOCKET_ENDPOINT = "http://localhost:8080"

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  userData:any
  id!: string;
  chats:any;
  messages:any;
  show = true;
  send_message!: string;
  reciever_id !: string
  topName!: string;
  topImage: string ="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"

  constructor(private _router:Router, private _dataService:DataService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.getUserData();
    this.socketService.setupSocketConnection();

  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  async Logout(){
    await localStorage.removeItem("token")
    this._router.navigate(['/auth/login'])
  }
  getUserData(){
    const user:any =localStorage.getItem('userData')
    this.userData = JSON.parse(user).user
    this.id = this.userData._id
    this._dataService.getUser(this.id).subscribe((res)=>{
      this.chats = JSON.parse(JSON.stringify(res.data))
    })

  }
  getMessages(reciever_id:string,name:string,image:string){
    this.topName = name
    this.show = false
    this.topImage = image
    this.reciever_id = reciever_id
    const msgInfo = {"from":this.id,"to":reciever_id}
    this._dataService.getMessagae(msgInfo).subscribe((res)=>{
        this.messages = JSON.parse(JSON.stringify(res.data))
        console.log(this.messages)
    })
    

  }

  sendMessage(){
    const sendInfo = {"from":this.id, "to":this.reciever_id,"message":this.send_message}
    this.send_message = ""
    this._dataService.addMessagae(sendInfo).subscribe((res)=>{
      console.log("message sent",res)
    })
  }

}
