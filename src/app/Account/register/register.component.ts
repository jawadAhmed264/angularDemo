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
  roles : any[];
  constructor(private fb:FormBuilder,private service:AccountService, private router: Router) { }
  
  ngOnInit(): void {
    if (this.service.isLogin()) {
      this.router.navigate(['forbidden']);
    }
    this.service.getAllRoles().subscribe(
        (data : any)=>{
          data.forEach(obj => obj.selected = false);
          this.roles = data;
        }
    );
   
     this.regForm=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
     },{ validators: comparePassword });
  }
  
  onRegister(){
      var x = this.roles.filter(x => x.selected).map(y => y.Name);
      this.service.registerUser(this.regForm.value,x).subscribe(data=>{
         this.regForm.reset();
         if (this.roles)
           {this.roles.map(x => x.selected = false);}
         alert("User Register Successfully");
         this.router.navigate(['login']);
      },Error=>{console.log(Error[0])});
  }
  
  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
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


