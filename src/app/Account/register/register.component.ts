import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AccountService } from 'src/app/sharedServices/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup;
  
  constructor(private fb:FormBuilder,private service:AccountService, private router: Router) { }
  
  ngOnInit(): void {
     this.regForm=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
     });
  }
  
  onRegister(){
      this.service.registerUser(this.regForm.value).subscribe(data=>{
         this.regForm.reset();
         alert("User Register Successfully");
         this.router.navigate(['login']);
      },Error=>{console.log(Error[0])});
  }

}
