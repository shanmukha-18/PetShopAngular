import { Component, OnInit } from '@angular/core';
import { PetFood } from '../../../../models/pets';
import { PetFoodService } from '../../../../Services/petfood.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-pet-food-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, RouterLink, FormsModule, AdminHeaderComponent],
  templateUrl: './pet-food-list.component.html',
  styleUrl: './pet-food-list.component.css'
})
export class PetFoodListComponent implements OnInit {
  petFoods: PetFood[] = [];
  p:number=1;

  name?: string;
  brand?: string;
 
  constructor(private petFoodService: PetFoodService) {}
 
  ngOnInit(): void {
  this.loadAllPetFoods()
  }
  loadAllPetFoods(): void {
    this.petFoodService.getAllPetFood().subscribe({
      next: (data) => this.petFoods = data,
      error: (err) => console.error('Error fetching pet foods:', err)
    });
  }
  searchByName(): void {
    if (this.name) {
      this.petFoodService.getPetFoodsByName(this.name).subscribe({
        next: (data) => this.petFoods = data,
        error: (err) => console.error('Error fetching pet foods by name:', err)
      });
    } else {
      this.loadAllPetFoods();
    }
  }

  filterByBrand(): void {
    if (this.brand) {
      this.petFoodService.getPetFoodsByBrand(this.brand).subscribe({
        next: (data) => this.petFoods = data,
        error: (err) => console.error('Error fetching pet foods by brand:', err)
      });
    } else {
      this.loadAllPetFoods();
    }
  }


  clearFilters(): void {
    this.name = '';
    this.brand = '';
   
    this.loadAllPetFoods();
  }
  

}
