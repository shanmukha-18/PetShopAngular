import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccination } from '../models/pets';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private apiUrl = "http://localhost:8082/api/v1/vaccinations";
 
  constructor(private http: HttpClient) {}
 
  getVaccinations(): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.apiUrl+'/get');
  }
  getVaccinationById(id: number): Observable<Vaccination> {
    return this.http.get<Vaccination>(`${this.apiUrl}/${id}`);
  }
  createVaccination(vaccination: Vaccination): Observable<Vaccination> {
    return this.http.post<Vaccination>(`${this.apiUrl}/add`,vaccination);
  }

  updateVaccination(id: number, vaccination: Vaccination): Observable<Vaccination> {
    return this.http.put<Vaccination>(`${this.apiUrl}/update/${id}`, vaccination);
  }
}
