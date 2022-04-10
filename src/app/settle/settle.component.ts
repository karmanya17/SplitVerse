import { CommonModule,Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { GroupService } from '../group.service';
import { groupdetails } from '../model';
import { member } from '../model';
@Component({
  selector: 'app-settle',
  templateUrl: './settle.component.html',
  styleUrls: ['./settle.component.css']
})
export class SettleComponent implements OnInit {
  private urlHistory:string[]=[]
  result:Array<string>=[]
  rupees="&#8377;"
  target="";
  settled=false;
  groupid='';
  constructor(private activeRoute: ActivatedRoute,private groupService:GroupService,private router:Router,private location:Location) {
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
      this.groupid=paramsData.id
    })
    this.settle();
  }
  settle(){
    this.activeRoute.params.subscribe((paramsData) => {
      this.groupService.getGroupById(paramsData.id).subscribe((data) => {
        //console.log(data);
        let total=0,n=data.member.length,temp=data.member;
        data.member.forEach((member)=>{
          total+=member.paid;
        })
        let target=total/n; 
        console.log(target);
        this.target=target.toFixed(2);
        for(let member of temp)
        {
          member.paid=member.paid-target;
        }
        while(1)
        { 
          let val1 = -1, Max = -1, curr = 0;

          for(var member of temp)
          {
              if(member.paid > val1)
              {
                  val1 = member.paid;
                  Max = curr;
              }
              curr++;
          }
          let val2 = 1, Min = -1;

          curr = 0;

          for(var member of temp)
          {
              if(member.paid < val2)
              {
                  val2 = member.paid;
                  Min = curr;
              }

              curr++;
          }
          if(temp[Max].paid == 0 || temp[Min].paid == 0){
            break;  
          }
      let name1 = temp[Max].membername;
      let name2 = temp[Min].membername;

      let b = -temp[Min].paid;
      let a = temp[Max].paid;

      let val;
      if(a > b)
          val = b;
      else
          val = a;

          console.log(a, b);

      temp[Min].paid += val;
      temp[Max].paid -= val;

      let resultstr = name2 + ' pay ₹ ' + val.toFixed(2)+` to ` + name1;
      this.result.push(resultstr);
        }
    this.settled=this.result.length==0?true:false;
    console.log(this.result);
      })
    })
  }
  settlePayment(id:any){
    this.groupService.settleGroupPayment(id).subscribe(res=>{
      this.router.navigate(['/group',this.groupid])
    })
  }


}
