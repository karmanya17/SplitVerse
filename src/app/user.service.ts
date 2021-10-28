import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user ,LoginUser,LoginResponse} from './model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  registerUser(data:user){
    return this.http.post("https://stark-retreat-89439.herokuapp.com/user/register",data)
  }
  loginUser(data:LoginUser){
    return this.http.post<LoginResponse>("https://stark-retreat-89439.herokuapp.com/user/login",data)
  }
  getuser(){
    return this.http.get <Array<user>>("https://stark-retreat-89439.herokuapp.com/user");
  }
}
