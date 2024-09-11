import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pets } from '../models/pets';
import { DTO } from '../models/dto';


@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {
private apiUrl="http://localhost:8082/api/v1/pets";
constructor(private http:HttpClient){}
getAllPets():Observable<Pets[]>{
return this.http.get<Pets[]>(this.apiUrl+'/get')
}
getPetById(id:number):Observable<Pets>{
  console.log(id);
  return this.http.get<Pets>(`${this.apiUrl}/${id}`);
}

getPetsByCategory(category:string):Observable<Pets[]>{
  return this.http.get<Pets[]>(`${this.apiUrl}/category/${category}`);
}
getPetsByBreedName(breed:string):Observable<Pets[]>{
  // console.log(breed);
  // console.log(`${this.apiUrl}/breed/${breed}`);
  
  return this.http.get<Pets[]>(`${this.apiUrl}/breed/${breed}`);
}

getPetsByVaccination(petId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/vaccinations/${petId}`);
}

getSupplierByPetId(petId: number): Observable<Pets[]> {
  return this.http.get<Pets[]>(`${this.apiUrl}/suppliers/${petId}`);
}

getPetFoodByPetId(petId: number): Observable<Pets[]> {
  return this.http.get<Pets[]>(`${this.apiUrl}/food_info/${petId}`);
}
getPetVaccinationId(petId:number):Observable<Pets[]> {
  return this.http.get<Pets[]>(`${this.apiUrl}/vaccinations/${petId}`);
}
// addPet(pet:Pets):Observable<void>{
//   return this.http.post<void>(`${this.apiUrl}/add`,pet);
// }
// updatePet(id:number,updatePet:Pets):Observable<Pets>{
//   return this.http.put<Pets>(`${this.apiUrl}/update/${id}`,updatePet)
// }


addPet(pet:DTO):Observable<any>{

  console.log(pet,"in service")
  return this.http.post<any>(`${this.apiUrl}/add`,pet);
}
updatePet(id:number,updatePet:DTO):Observable<any>{
  return this.http.put<any>(`${this.apiUrl}/update/${id}`,updatePet)
}


}
