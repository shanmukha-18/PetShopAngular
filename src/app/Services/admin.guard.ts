import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,private loginService: LoginService) {}

//   canActivate(): boolean {
//     const role = localStorage.getItem('role');
//     if (role === 'admin') {
//         console.log(role)
//       return true;
//     } else {
//       this.router.navigate(['/login']); 
//       return false;
//     }
//   }

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isAuthenticated() && this.loginService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']); 
    return false;
  }
}