import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { AccountService } from 'src/app/sharedServices/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup;
  
  constructor(private fb:FormBuilder,private service:AccountService, private router: Router) { }
  
  ngOnInit(): void {
    if (this.service.isLogin()) {
      this.router.navigate(['']);
   }
     this.regForm=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
     },{ validators: comparePassword });
  }
  
  onRegister(regForm:any){
      this.service.registerUser(this.regForm.value).subscribe(data=>{
         this.regForm.reset();
         alert("User Register Successfully");
         this.router.navigate(['login']);
      },Error=>{console.log(Error[0])});
  }
   
}
export function comparePassword(
   control: AbstractControl
 ): ValidationErrors | null {
   if (control && control.get("password") && control.get("confirmPassword")) {
     const pass = control.get("password").value;
     const confirmPass = control.get("confirmPassword").value;  
     return (pass!=confirmPass && pass!=null) ? { passwordNotMatch: true } : null
   }
   return null;
 }


