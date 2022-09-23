import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:any;

  constructor() { }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.emit('add', 'Hello there from Angular.');
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
