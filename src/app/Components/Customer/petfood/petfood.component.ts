import { Component, OnInit } from '@angular/core';
import { PetFood } from '../../../models/pets';

import { CommonModule } from '@angular/common';
import { PetFoodService } from '../../../Services/petfood.service';
import { CartService } from '../../../Services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-petfood',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule, HeaderComponent, FooterComponent],
  templateUrl: './petfood.component.html',
  styleUrl: './petfood.component.css'
})
export class PetfoodComponent implements OnInit {
  petFoods: PetFood[] = [];
  p:number=1;
  name?: string;
  brand?: string;
  petFood!:any;
  constructor(private petFoodService: PetFoodService,private cartService:CartService) {}
 
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
addPetFoodToCart(petFood:PetFood){
  console.log(petFood)
  petFood.itemQ=1
 
  this.cartService.addPetFoodToCart(petFood)
}
}
 