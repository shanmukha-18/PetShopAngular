import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Pets } from '../../../models/pets';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
 
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  carouselImages: string[] = [
    "images/pc2.jpg",
    "images/pc1.jpg",
    "images/pc3.jpg"
  ];
  users: number[] = [1, 2, 3, 4];
  displayedPets: Pets[] = [];
  displayedCats: Pets[] = [];
  pets: Pets[] = [];
  selectedPet: Pets | null = null; // For storing pet details
 
  constructor(private petDetailsService: PetDetailsService) {}
 
  ngOnInit(): void {
    // Fetch and filter pets by category on initialization
    this.getPetsByCategory('Dogs');
    this.getPetsByCategory('Cats'); // Fetch cats as well
  }
 
  // Method to get pet details by ID
  getPetById(id: number): void {
    this.petDetailsService.getPetById(id).subscribe(
      (data: Pets) => {
        this.selectedPet = data;
      },
      error => {
        console.error('Error fetching pet by ID', error);
      }
    );
  }
 
  // Method to get pets by category
  getPetsByCategory(category: string): void {
    this.petDetailsService.getPetsByCategory(category).subscribe(
      (data: Pets[]) => {
        this.pets = data;
        if (category === 'Dogs') {
          this.filterAndDisplayPets('Dogs', 'displayedPets');
        } else if (category === 'Cats') {
          this.filterAndDisplayPets('Cats', 'displayedCats');
        }
      },
      error => {
        console.error(`Error fetching pets by category ${category}`, error);
      }
    );
  }
 
  filterAndDisplayPets(categoryName: string, displayArrayName: string): void {
    // Determine which array to update based on category
    const displayArray = displayArrayName === 'displayedPets' ? this.displayedPets : this.displayedCats;
 
    displayArray.splice(0, displayArray.length, ...this.pets
      .filter(pet => pet.category?.name === categoryName) // Adjust based on actual property names
      .slice(0, 4));
  }
 
  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    if (carouselElement) {
      const carousel = (window as any).bootstrap.Carousel;
      new carousel(carouselElement);
    }
  }
}