import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser,LoginResponse } from '../model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private userService:UserService,private router:Router) { 
    this.loginForm=new FormGroup({
      'email':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }
  submit(){
    this.userService.loginUser(this.loginForm.value).subscribe((data:LoginResponse)=>{
      window.localStorage.setItem("access_token",data.token)
      window.localStorage.setItem("userId",data.userId)
      let userid=window.localStorage.getItem('userId')
      //console.log(userid);
      this.router.navigate(['/dashboard'])
    },(err)=>{
      console.log(err)
    })
  }

}
