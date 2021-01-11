import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdleModalComponent } from './structure/idle-modal/idle-modal.component';
import { AppService } from './sharedServices/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  userLang:string;

  constructor(
    public translate: TranslateService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router:Router,
    private modalService: NgbModal,
    private appService:AppService) 
  {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
    
    // try to get saved language
    var storedLang: string = this.appService.getLanguage();
       if (storedLang !== ""){
          this.userLang = storedLang;
          translate.use(this.userLang);
       }
        //Auto Logout on Idle

        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(600);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(15);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => { 
          this.idleState = 'No longer idle.'
          console.log(this.idleState);
          this.reset();
        });

        idle.onTimeout.subscribe(() => {
          this.idleState = 'Timed out!';
          this.timedOut = true;
          console.log(this.idleState);
          this.router.navigate(['login']);
          window.location.reload();
          localStorage.clear();
        });

        idle.onIdleStart.subscribe(() => {
          this.idleState = 'You\'ve gone idle!'
          console.log(this.idleState);
          const modalRef = this.modalService.open(IdleModalComponent);
            modalRef.componentInstance.idleState=this.idleState;
            modalRef.closed.subscribe(result => {
              //this.reset();
            });
        });

        idle.onTimeoutWarning.subscribe((countdown) => {
          this.idleState = 'You will time out in ' + countdown + ' seconds!'
          console.log(this.idleState);
        });

        // sets the ping interval to 15 seconds
        this.keepalive.interval(15);

        this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
        this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
          if (userLoggedIn) {
            idle.watch()
            this.timedOut = false;
          } else {
            idle.stop();
          }
        })
    }

    reset() {
      this.idle.watch();
      //xthis.idleState = 'Started.';
      this.timedOut = false;
    }
  
}

