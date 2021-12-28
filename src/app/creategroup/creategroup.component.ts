import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  groupFrom:FormGroup
  constructor(private groupService:GroupService,private router:Router,private activeRoute:ActivatedRoute,private formBuilder:FormBuilder) { 
    this.groupFrom=new FormGroup({
      'groupname': new FormControl('', Validators.required),
      'groupdescription':new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
  }
  submit(){
    Object.keys(this.groupFrom.controls).forEach(field => {
      const control = this.groupFrom.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.groupFrom.valid){
      //console.log(this.groupFrom.value);
      this.activeRoute.params.subscribe((paramsData)=>{
      //  this.groupFrom.addControl('userId',this.formBuilder.control('',[Validators.required]))
        this.groupFrom.addControl('count',this.formBuilder.control('',[Validators.required]))
        this.groupFrom.value.count=0;
       // this.groupFrom.value.userId=paramsData.id;
        this.groupService.saveGroup(this.groupFrom.value).subscribe(() => {
          this.router.navigate(['/dashboard'])
        },() => {
          alert("Something Went Wrong")
        })
      })
      
      
    }
  }
}
