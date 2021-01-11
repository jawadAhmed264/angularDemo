import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userLoggedIn = new Subject<boolean>();

  constructor() {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

   getLanguage():string{
        if (localStorage){
            return localStorage['language'] || "";
        }
        else{
            return "";
        }
    }

    setLanguage(language: string){
        if (localStorage){
            localStorage['language'] = language;
        }
    }
}