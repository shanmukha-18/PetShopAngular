import { Component, OnInit } from '@angular/core';
import { Vaccination } from '../../../models/pets';
import { VaccinationService } from '../../../Services/vaccination.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
 
@Component({
  selector: 'app-vaccination',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './vaccination.component.html',
  styleUrl: './vaccination.component.css'
})
export class VaccinationComponent implements OnInit {
  vaccinations: Vaccination[] = [];
 
 
  constructor(private vaccinationService: VaccinationService, private router: Router) {}
 
  ngOnInit(): void {
    this.vaccinationService.getVaccinations().subscribe(data => {
      this.vaccinations = data;
    });
    this.loadVaccinations();
   
  }
  loadVaccinations(){
    this.vaccinationService.getVaccinations().subscribe(
      {
        next: (data) =>{ this.vaccinations = data,console.log(data)},
        error: (error) => console.error('Error fetching vaccination data', error)
      }
    );
  }
  bookNow(vaccination: Vaccination): void {
    this.router.navigate(['/vaccination/book', vaccination.vaccinationId]);
  }
}