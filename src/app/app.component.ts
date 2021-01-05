import { Component } from '@angular/core';
import { AccountService } from './sharedServices/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(private service:AccountService){}

}

