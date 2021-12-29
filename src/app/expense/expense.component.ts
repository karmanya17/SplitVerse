import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { groupdetails } from '../model';
import { member } from '../model';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  groupid=0
  memberid=""
  name:string="";
  group:groupdetails={
    groupname:"",
    description:"",
    member:[],
    count:0
  }
  moneyForm:FormGroup
  constructor(private activeRoute: ActivatedRoute,private groupService:GroupService,private formBuilder:FormBuilder,private router:Router) {
    this.moneyForm=new FormGroup({
      'paid':new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
     // console.log(typeof paramsData.id )
     this.groupid=paramsData.id.slice(0,24)
     this.memberid=paramsData.id.slice(25,30)
      //console.log(this.groupid)
      console.log(this.memberid)
      this.groupService.getGroupById(this.groupid).subscribe((data) => {
        this.group=data;  
//         console.log(this.group);
        data.member.forEach((member,i)=>{
         // console.log(member.id)
          //console.log(this.memberid)
          let id=member.id.toString();
          //console.log(id)
          //console.log(this.memberid.toString())
          if(id==this.memberid.toString()){
           // console.log(member);
          // console.log("matched")
            this.name=member.membername;
          }
        }) 
      })
    })
  }

  submitMoney(){
    this.groupService.getGroupById(this.groupid).subscribe((data) => {
      //console.log(data); 
      let c=0;
      data.member.forEach((member,i)=>{
        let id=member.id.toString();
        if(id==this.memberid.toString()){
         // console.log("matched")
         c=i;
        }
      }) 
     // console.log(this.group.member[c].paid);
     if(this.moneyForm.value.paid){
      this.group.member[c].paid=this.moneyForm.value.paid
     }
      
      this.groupService.updateGroupById(this.groupid,this.group).subscribe((data) => {
        this.router.navigate(['/group',this.groupid])
      })
    })
  }

}
