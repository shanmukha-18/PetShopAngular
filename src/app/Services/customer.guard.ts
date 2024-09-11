

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private loginService: LoginService,private router: Router) {}


canActivate( ): boolean {
    if (this.loginService.isAuthenticated() && this.loginService.isCustomer()) {
      return true;
    }
    this.router.navigate(['/']); 
    return false;
  }

}

