import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/shared/model/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  photo:any
  url:any
  show= true
  userCred = new AuthModel('','','')

  constructor(private _auth: AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    this._auth.Register({data:this.userCred,image:this.url}).subscribe((res)=>{
      console.log("credentials",this.userCred)
      this._router.navigate(['/auth/login'])
      console.log(res)
    })


  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return
    }
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return
    }
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result
      console.log(this.url)
      this.show = false
    }
  }

}
