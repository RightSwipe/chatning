import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders().set('Content-Type','application-json');

  constructor(private _http:HttpClient) { }

  getUser(id:String,switchNum:Number){
    const data = {"id":id,"switchNum":switchNum}
    return this._http.put<any>("http://localhost:8080/user",data)
  }
  addMessagae(data:object){
    console.log(data)
    return this._http.post<any>("http://localhost:8080/add-message",data)
  }
  getMessagae(data:object){
    console.log(data)
    return this._http.post<any>("http://localhost:8080/get-message",data)
  }

}
