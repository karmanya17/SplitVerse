import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { groupdetails } from './model';
import { member } from './model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  constructor(private http:HttpClient) { }
  saveGroup(group:groupdetails){
    console.log(group);
    return this.http.post(`https://stark-retreat-89439.herokuapp.com/create-group`,group,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
    })
  }
  getAllGroups(){
      return this.http.get<Array<groupdetails>>(`https://stark-retreat-89439.herokuapp.com/groups`,{
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          Authorization:localStorage.getItem("access_token")||""
        })
      })
  }
  saveMember(group:groupdetails){

    return this.http.put(`https://stark-retreat-89439.herokuapp.com/groups`,group,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
    })
  }
  getGroupById(id:number){
    return this.http.get<groupdetails>(`https://stark-retreat-89439.herokuapp.com/group/${id}`,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
    })
  }
  updateGroupById(groupId:number,groupdata:groupdetails){
    return this.http.put(`https://stark-retreat-89439.herokuapp.com/group/${groupId}`,groupdata,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
    })
  }
  deleteGroupById(id:number){
    return this.http.delete(`https://stark-retreat-89439.herokuapp.com/group/${id}`,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
  }
  deletememberById(id:number){
    return this.http.delete(`https://stark-retreat-89439.herokuapp.com/group/member/${id}`,{
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:localStorage.getItem("access_token")||""
      })
  }
}
