import { Component, OnInit } from '@angular/core';
import { Pets } from '../../../../models/pets';

import { CommonModule } from '@angular/common';
import { PetDetailsService } from '../../../../Services/pet-details.service';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";
 
@Component({
  selector: 'app-petsList',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, AdminHeaderComponent],
  templateUrl: './petsList.component.html',
  styleUrl: './petsList.component.css'
})
export class PetsListComponent implements OnInit {
 p:number=1;
  pets:Pets[]=[]
  petDetails: any = {};
  foodInfo: any[] = [];
  suppliers: any[] = [];
  vaccinations:any[]=[]
  category: string = '';
  petId: number = 0;
  selectedPetId: number = 0;
  constructor(private petService:PetDetailsService,private router:Router){}
 
  ngOnInit(): void {
    this.loadAllPets()
  }

  loadAllPets(){
    this.petService.getAllPets().subscribe({
      next:(data)=>this.pets=data
    })
  }


  filterByCategory(): void {
    if (this.category) {
      this.petService.getPetsByCategory(this.category).subscribe({
        next: (data) => this.pets = data,
        error: (err) => console.error('Error filtering pets', err)
      });
    }
  }

  getDetailsByPetId(): void {
    if (this.petId) {
      this.petService.getPetFoodByPetId(this.petId).subscribe({
        next: (data) => this.foodInfo = data,
        error: (err) => console.error('Error fetching food info', err)
      });
      this.petService.getSupplierByPetId(this.petId).subscribe({
        next: (data) => this.suppliers = data,
        error: (err) => console.error('Error fetching suppliers', err)
      });


      
      this.petService.getPetVaccinationId(this.petId).subscribe({
        next: (data) => this.vaccinations = data,
        error: (err) => console.error('Error fetching vaccinations', err)
      });
    }
  }

   onPetSelect(petId: number): void {
    this.selectedPetId = petId;
    this.petId = petId;
    this.getDetailsByPetId();
  }

  clearFilters(): void {
    
 
  
 this. petId =0;
  this.selectedPetId = 0;
  this.loadAllPets()
  }



 
 
 
}