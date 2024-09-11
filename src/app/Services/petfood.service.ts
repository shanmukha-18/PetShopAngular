 
 
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetFood } from '../models/pets';
 
@Injectable({
  providedIn: 'root'
})
export class PetFoodService {
  private apiUrl = "http://localhost:8082/api/v1/petfood";
 
  constructor(private http: HttpClient) {}
 
  getAllPetFood(): Observable<PetFood[]> {
    return this.http.get<PetFood[]>(this.apiUrl+'/get');
  }

 getPetFoodById(id:number):Observable<PetFood>{
  return this.http.get<PetFood>(`${this.apiUrl}/${id}`);
 }
  getPetFoodsByName(name: string): Observable<PetFood[]> {
    return this.http.get<PetFood[]>(`${this.apiUrl}/name/${name}`);
  }

  getPetFoodsByBrand(brand: string): Observable<PetFood[]> {
    return this.http.get<PetFood[]>(`${this.apiUrl}/brand/${brand}`);
  }
  createPetFood(petFood: PetFood): Observable<PetFood> {
    return this.http.post<PetFood>(`${this.apiUrl}/add`,petFood);
  }

  updatePetFood(id: number, petFood: PetFood): Observable<PetFood> {
    return this.http.put<PetFood>(`${this.apiUrl}/update/${id}`, petFood);
  }



}
 