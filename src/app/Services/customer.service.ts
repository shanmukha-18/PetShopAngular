import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../models/pets';

 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  private apiUrl = "http://localhost:8082/api/v1/customers"
 
  constructor(private http:HttpClient){}
 
  // private customer = new Subject<Customer>()
  // customer$:Observable<Customer>=this.customer.asObservable()
 
  getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl+'/get')
  }

  getCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getCustomersByCity(city: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/by_city/${city}`);
  }

  
  getCustomersByState(state: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/by_state/${state}`);
  }

  findCustomerByName(firstName: string, lastName: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/name/${firstName}/${lastName}`);
  }
  addCustomer(customer:Customer):Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/add`,customer);
  }

  updateCustomer(id:number,updateCustomer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.apiUrl}/update/${id}`,updateCustomer)
  }
  }
 