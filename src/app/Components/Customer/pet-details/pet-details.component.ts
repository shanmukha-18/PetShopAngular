import { Component, Input, OnInit } from '@angular/core';
import { Pets } from '../../../models/pets';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { CommonModule } from '@angular/common';
import { PetCardsComponent } from '../pet-cards/pet-cards.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, PetCardsComponent, HeaderComponent, FooterComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent implements OnInit{
@Input({required:true})  pet!:Pets;
 id!:number;
 clickCount:number=0;
 cartNum:number=0;
constructor(private activatedRoute:ActivatedRoute,private petDetailsService:PetDetailsService,private cartService:CartService){}
 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(
   params=>{
     this.id=parseInt(params.get('id')!)
   })
   if(this.id){
    this.petDetailsService.getPetById(this.id).subscribe(
      (data)=>{this.pet=data}
    )
   }

}

addPetToCart(pet:Pets){

  console.log(pet)
  pet.itemQ=1
 this.cartNum++;
  this.cartService.addPetToCart(pet)
}

  }




