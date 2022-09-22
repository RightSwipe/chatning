import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders().set('Content-Type','application-json');

  constructor(private _http:HttpClient) { }

  getUser(id:String){
    return this._http.get<any>("http://localhost:8080/user/"+id,{headers:this.headers})
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
