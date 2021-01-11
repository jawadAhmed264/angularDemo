import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/sharedServices/app.service';

@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.css']
})
export class IdleModalComponent implements OnInit {
  @Input() idleState;
  constructor(public activeModal: NgbActiveModal,private appService:AppService,private router:Router) { }

  ngOnInit(): void {
    
  }
  
  
  stay() {
    this.activeModal.close('Notify click');
  }

  logout() {
    this.activeModal.close('Notify click');
    this.appService.setUserLoggedIn(false);
    this.router.navigate(['login']);
    window.location.reload();
    localStorage.clear();
  }
}
