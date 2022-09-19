import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/shared/model/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  userCred = new AuthModel('','','','')

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
  }
  submit(){
  this._auth.NewPassword(this.userCred).subscribe((res)=>{
    console.log(res)
  })

  }

}
