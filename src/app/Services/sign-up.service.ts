import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/pets';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private route:Router,private http:HttpClient){}
  private apiUrl="http://localhost:8082/api/v1/user/add"

addData(user:User): Observable<User> {
  console.log(user)
  return this.http.post<User>(`${this.apiUrl}`,user);
}
}
