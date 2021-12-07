import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logintopnav',
  templateUrl: './logintopnav.component.html',
  styleUrls: ['./logintopnav.component.css']
})
export class LogintopnavComponent implements OnInit {

  userName=""
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getuser().subscribe((data)=>{
   //   console.log(data);
      data.forEach((user)=>{
        let userid=window.localStorage.getItem('userId')
        console.log(userid);
        if(user._id==userid){
          this.userName=user.name
        }
      })
    })
  }
logout(){
  localStorage.removeItem("access_token")
  this.router.navigate([''])
}
}
