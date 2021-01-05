import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterModel } from '../Models/register-model';
import { LoginModel } from '../Models/login-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  loginUrl:string="https://localhost:44395";
  accountUrl:string="https://localhost:44395/api/Account/";

  registerUser(register:RegisterModel):Observable<any>
  {
     register.Role="User";
     return this.http.post(this.accountUrl+"Register",register);
  }
  loginUser(login:LoginModel):Observable<any>
  {
   {
      var data = "Grant_Type=password&Username=" + login.username + "&Password=" + login.password;
      return this.http.post(this.loginUrl + '/Token', data);
    }
  }
  logout()
  {
     return this.http.post(this.accountUrl+"logout",null);
  }

  isLogin():boolean{
    return (localStorage.getItem('userToken')!=null)? true:false;
  }
  
}
