import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/pets';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
private apiUrl="http://localhost:8082/api/v1/suppliers"


  constructor(private http:HttpClient) { }
  getAllSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.apiUrl+'/get')
  }

  getSupplierById(id:number):Observable<Supplier>{
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  getSupplierByCity(city: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/city/${city}`);
  }

  getSupplierByName(name: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/name/${name}`);
  }

  addSupplier(supplier:Supplier):Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/add`,supplier);
  }
  updateSupplier(id:number,updateSupplier:Supplier):Observable<Supplier>{
    return this.http.put<Supplier>(`${this.apiUrl}/update/${id}`,updateSupplier)
  }

}
