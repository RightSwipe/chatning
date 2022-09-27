import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { io,Socket } from 'socket.io-client';

const SOCKET_ENDPOINT = 'ws://localhost:5000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket;

  constructor() {this.socket = io(SOCKET_ENDPOINT); }
  setupSocketConnection(id:any) {
    this.socket.emit('addUser', id);
  }
  sendRealtimeMessage(data:any){
    console.log(data)
    this.socket.emit('sendMessage',data.from,data.to,data.message)
}
getMessage(): Observable<any> {
  return new Observable<{user: string, message: string}>(observer => {
    this.socket.on('getMessage', (data:any) => {
      observer.next(data);
    });
  });
}
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
