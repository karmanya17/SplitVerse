import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { groupdetails } from '../model';
import { member } from '../model';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {


  groupname=""
  groupid=""
  members:Array<member>=[]
  group:groupdetails={
    groupname:"",
    description:"",
    member:[],
    count:0
  }
  memberForm:FormGroup
  // moneyForm:FormGroup
  constructor(private activeRoute: ActivatedRoute,private groupService:GroupService,private formBuilder:FormBuilder) { 
    this.memberForm=new FormGroup({
      'membername': new FormControl('', [Validators.pattern("[a-zA-Z ]*")])
    })
    // this.moneyForm=new FormGroup({
    //   'paid': new FormControl('', Validators.required)
    // })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
      this.groupid=paramsData.id
      this.groupService.getGroupById(paramsData.id).subscribe((data) => {
       // console.log(data);
        this.members=data.member;
        this.groupname=data.groupname
        
      })
    })

  }
  generateId(){
    let rndResult="";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEF"
    "GHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength=characters.length;
    for(let i=0;i<5;i++)
    { 
      rndResult+=characters.charAt(Math.floor(Math.random()*charactersLength))
    }
    return rndResult;
  }

  submitMember(form:FormGroup){

    Object.keys(this.memberForm.controls).forEach(field => {
      const control = this.memberForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.memberForm.valid){
      console.log(this.memberForm.value);
      this.memberForm.addControl('paid',this.formBuilder.control(''));
      this.memberForm.addControl('id',this.formBuilder.control(''));

      this.memberForm.value.paid=0;
      this.memberForm.value.id=this.generateId();
      this.activeRoute.params.subscribe((paramsData) => {
        this.groupService.getGroupById(paramsData.id).subscribe((data) => {
          console.log(data);
          data.member.push(this.memberForm.value)
          data.count+=1;
          this.group=data;
          this.groupService.updateGroupById(paramsData.id,this.group).subscribe((data) => {
            form.reset();
            this.ngOnInit();
          })
        })
      })
      
    }

  }
  removeMember(id:any){
    this.groupService.deletememberById(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
