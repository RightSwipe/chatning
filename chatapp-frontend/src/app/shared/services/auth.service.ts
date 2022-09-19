import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  Register(data:any){
    return this._http.post('http://localhost:8080/register',data)
  }
  Verify(data:any){
    return this._http.post('http://localhost:8080/login',data, {headers:this.headers})
  }
  NewPassword(data:any){
    return this._http.put('http://localhost:8080/newpassword',data)
  }
  isLoggedIn(){
    return !! localStorage.getItem('token')
  }

}
