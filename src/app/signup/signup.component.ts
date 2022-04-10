import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup
  constructor(private userService:UserService,private router:Router) {
    this.signupForm=new FormGroup({
      'name':new FormControl('',Validators.required),
      'email':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
      'confirmpassword':new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
  submit(){
    if(this.signupForm.value.password===this.signupForm.value.confirmpassword){
      //console.log(this.signupForm.value)
      this.signupForm.removeControl('confirmpassword');
      this.userService.registerUser(this.signupForm.value).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/login'])
      },(err)=>{
        console.log(err)
      })
    }
    else
    {
      alert("Password Mismatched")
    }
    

  }

}
