import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AccountService} from  '../sharedServices/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private userService:AccountService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean
     {
      if (localStorage.getItem('userToken') != null)
      {
        let roles = next.data["userRoles"] as Array<string>;
        if (roles) {
          var match = this.userService.roleMatch(roles);
          if (match) return true;
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
