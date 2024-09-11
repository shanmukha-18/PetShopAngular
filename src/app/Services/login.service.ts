import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/pets';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    constructor(private route:Router,private http:HttpClient){}
    private apiUrl="http://localhost:8082/api/v1/user/get";


     
    getData(username: string, password: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${username}/${password}`).pipe(
        map(response => {
          if (response) {
            localStorage.setItem('user', 'loggedIn');
            localStorage.setItem('role', response.role);
            return response;
             
          }
          return null;
        }),
        catchError(error => {
          console.error('Authentication failed', error);
          return of(null);
        })
      );
    }
    isAuthenticated(): boolean {
      return localStorage.getItem('user') === 'loggedIn';
    }
  
    // Check if user has admin role
    isAdmin(): boolean {
      return localStorage.getItem('role') === 'admin';
    }
  
    // Check if user has customer role
    isCustomer(): boolean {
      return localStorage.getItem('role') === 'customer';
    }
  
    // Log out user by clearing localStorage
    logout(): void {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
//   if(localStorage.getItem('user')=='loggedIn'){
//     return true;
//   }
//   this.route.navigate([''])
//   return false;
// }
// getData(username: string, password: string): Observable<any> {
//   console.log(`${this.apiUrl}/${username}/${password}`);
  
//   return this.http.get<any>(`${this.apiUrl}/${username}/${password}`);
// }


    
  }
  

  
   
  
  

