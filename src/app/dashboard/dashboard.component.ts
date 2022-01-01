import { Component, OnInit } from '@angular/core';
import { groupdetails } from '../model';
import { GroupService } from '../group.service';
import {Router, ActivatedRoute, NavigationStart, Event as RouterEvent,
  NavigationEnd,
  NavigationCancel,
  NavigationError } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showOverlay = true;
  userid=""
  groupdetails:Array<groupdetails>=[]
  count=0
  constructor(private groupService:GroupService,private activeRoute:ActivatedRoute,private router: Router) { 
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(): void {
    this.loadData();
  }
    loadData(){
      this.activeRoute.params.subscribe((paramsData)=>{
        this.userid=paramsData.id;
      })
      this.groupService.getAllGroups().subscribe((data) => {
        this.groupdetails = data
      //console.log(this.groupdetails)
        this.count=this.groupdetails.length;
       })
    }
    deleteGroup(id:any){
      this.groupService.deleteGroupById(id).subscribe((data) => {
        this.ngOnInit();
      })
    }

    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.showOverlay = true;
      }
      if (event instanceof NavigationEnd) {
        this.showOverlay = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.showOverlay = false;
      }
      if (event instanceof NavigationError) {
        this.showOverlay = false;
      }
    }
}
