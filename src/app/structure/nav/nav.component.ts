import { Component, OnInit,DoCheck } from '@angular/core';
import { AccountService } from 'src/app/sharedServices/account.service';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/sharedServices/app.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements DoCheck,OnInit {
  signIn:boolean=false;
  constructor(private router:Router,public service:AccountService,public translate: TranslateService,private appService:AppService) { }

  ngOnInit(): void {
   
  }
  ngDoCheck(){
    if(this.service.isLogin()){
      this.signIn=true;
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    this.appService.setLanguage(lang);
  }
  logoutUser(){
    this.service.logout().subscribe(data=>{
       this.router.navigate(['login']);
       window.location.reload();
       localStorage.clear();
    });
  }
}
