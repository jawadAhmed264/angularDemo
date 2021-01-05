import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/login-model';
import { AccountService } from 'src/app/sharedServices/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isLoginError:boolean=false;
  constructor(private fb:FormBuilder,private service:AccountService,private router:Router) { }

  ngOnInit(): void {
    if (this.service.isLogin()) {
      this.router.navigate(['']);
   }
     this.loginForm=this.fb.group({
        username:['',[Validators.required]],
        password:['',[Validators.required]]
      });
  }

  onLogin(){
      let  loginModel= new LoginModel;
      loginModel.username=this.loginForm.controls['username'].value;
      loginModel.password=this.loginForm.controls['password'].value;
      loginModel.granttype='password';
      this.service.loginUser(loginModel).subscribe((data : any)=>{
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['department']);
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError=true;
         console.log(err);
      });
  }

}
