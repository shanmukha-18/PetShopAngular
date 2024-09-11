import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Pets } from '../../../models/pets';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  petBreeds: string[] = [];
  filteredBreeds: Pets[] = [];
  searchTerm: string = '';
  filtered!:Pets;
  breed!:string

  // for petcart
  cartItems:Pets[]=[];
  cartItemsFromCartService!:any[]|undefined


  petData=localStorage.getItem('petCart')
foodData=localStorage.getItem('petFood')
cartLenth!:number
  constructor(private route:Router,private cartService:CartService,private petService:PetDetailsService){
    this.cartItemsFromCartService={} as any[]
    const petParsedData=this.petData?JSON.parse(this.petData):[]
    const petFoodParsedData=this.foodData?JSON.parse(this.foodData):[]
   const items=[...petParsedData,...petFoodParsedData]
   this.cartService.setCartItems(items)
   this.cartService.cartLength$.subscribe(data=>{
this.cartLenth=data
   })
  }
  ngOnInit(): void {
    // if(this.searchTerm){
    //   this.loadPetBreeds(this.searchTerm)
    // }

    this.cartItems= this.cartService.getPetsFromCart();
    this.cartService.cartItems$.subscribe(data=>{
      this.cartItemsFromCartService=data
    })
   
    this.loadPetBreeds(this.searchTerm);
  
  }
  
  onSearch(): void {
    this.loadPetBreeds(this.searchTerm);
  }

 

  loadPetBreeds(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.petService.getPetsByBreedName(searchTerm).subscribe({
        next: (data) => {
          this.filteredBreeds = data;
          console.log('Filtered breeds:', this.filteredBreeds);
        },
        error: (error) => {
          console.error('Error loading pet breeds:', error);
        }
      });
    } else {
      this.filteredBreeds = [];
    }
  }
  clearInput(): void {
    this.searchTerm = '';
    this.filteredBreeds = [];
  }
 
 userLogout(){
  localStorage.removeItem('user')
  localStorage.removeItem('role')
  this.route.navigate([''])
 }
 showPet(name:string){
  this.route.navigate(['/singlePetCategory',name])
 }


 
}
