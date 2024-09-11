import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetCategory } from '../models/pets';

@Injectable({
  providedIn: 'root'
})
export class PetCategoryServiceService {
private apiUrl="http://localhost:8082/api/v1/categories";
  constructor(private http:HttpClient) { }

  getAllPetCategories():Observable<PetCategory[]>{
    return this.http.get<PetCategory[]>(this.apiUrl+'/get');
  }
  getPetCategoryById(id:number):Observable<PetCategory>{
    return this.http.get<PetCategory>(`${this.apiUrl}/${id}`);
  }
  getPetCategoryByName(name:string):Observable<PetCategory>{
    return this.http.get<PetCategory>(`${this.apiUrl}/${name}`);
  }
}
