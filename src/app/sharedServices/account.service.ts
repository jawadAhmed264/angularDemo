import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterModel } from '../Models/register-model';
import { LoginModel } from '../Models/login-model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  loginUrl:string="https://localhost:44395/token";
  accountUrl:string="https://localhost:44395/api/Account/";

  registerUser(register:RegisterModel):Observable<any>
  {
     return this.http.post(this.accountUrl+"Register",register);
  }
  loginUser(login:LoginModel)
  {
     return this.http.post(this.loginUrl,login);
  }
  logout()
  {
     return this.http.post(this.accountUrl+"logout",null);
  }
  
}
