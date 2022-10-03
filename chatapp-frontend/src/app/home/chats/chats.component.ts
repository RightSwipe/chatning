import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  userData:any
  id!: string;
  fullname!:string
  chats:any;
  messages:any;
  show = true;
  status!:boolean
  msgInfo:any
  send_message!: string;
  reciever_id !: string
  topName!: string;
  date : any
  topImage: string ="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
  userFilter: any = { fullname: '' };

  constructor(private _router:Router, private _dataService:DataService, private socketService: SocketService) {}

  ngOnInit():void{
    this.getUserData(0);
    this.socketService.setupSocketConnection(this.id)

  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  async Logout(){
    this.socketService.disconnect();
    await localStorage.removeItem("token")
    this._router.navigate(['/auth/login'])
  }
  getUserData(switchNum:Number){
    const user:any =localStorage.getItem('userData')
    this.userData = JSON.parse(user).user
    this.id = this.userData._id
    console.log(switchNum)
    this._dataService.getUser(this.id,switchNum).subscribe((res:any)=>{
      this.chats = JSON.parse(JSON.stringify(res.data))
    })
  }

  getMessages(reciever_id:string,name:string,image:string,status:boolean){
    this.topName = name
    this.show = false
    this.topImage = image
    this.reciever_id = reciever_id
    this.status = status
    this.msgInfo = {"from":this.id,"to":reciever_id}
    this._dataService.getMessagae(this.msgInfo).subscribe((res:any)=>{
        this.messages = JSON.parse(JSON.stringify(res.data))
        console.log(this.messages)
    })
    
    

  }

  async sendMessage(){
    const sendInfo = {"from":this.id, "to":this.reciever_id,"message":this.send_message}
 
    await this._dataService.addMessagae(sendInfo).subscribe((res:any)=>{
      this.messages = JSON.parse(JSON.stringify(res.data.add))
      console.log("message sent",res)
      this.getUserData(0);
    })
    this.socketService.sendRealtimeMessage(sendInfo)
    this.send_message = ""
    this.socketService.getMessage().subscribe((data:any)=>{
      this.messages = data.message
      console.log(data.message)

    })
  }
  Date(date:any){
    console.log(date)
    const dates = new Date (date)
    // console.log(date.getDate(),new Date().getUTCDate())
    const difference = dates.getDate() - new Date().getDate()
    if(difference === 0){
      // this.date = date.getHours()+":"+date.getMinutes()
      this.date = "Today"
      console.log(new Date(date).getDay() ===new Date().getDay())
    }
    else{
      this.date= date.slice(0,10)
    }
    return true
  }

  search()
  {
    if(this.fullname=""){
      this.ngOnInit()
    }
    else{
      this.chats = this.chats.filter( (res: { fullname: string; }): any=>{

        return res.fullname.toLowerCase().match(this.fullname.toLowerCase());

      })
    }
  }


    }
