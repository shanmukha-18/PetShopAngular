import { Component, Input, OnInit, Pipe } from '@angular/core';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { Pets } from '../../../models/pets';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SinglePetComponent } from '../single-pet/single-pet.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-pet-cards',
  standalone: true,
  imports: [CommonModule, SinglePetComponent, HeaderComponent, FooterComponent],
  templateUrl: './pet-cards.component.html',
  styleUrl: './pet-cards.component.css'
})
export class PetCardsComponent  {

pets:Pets[]=[];
constructor(private petDetailsService:PetDetailsService,private router:Router){}
  ngOnInit(): void {
    this.loadAllPets();
  }
 loadAllPets(){
  this.petDetailsService.getAllPets().subscribe(
    {
      next:(data)=>{
        this.pets=data;
        console.log(data)
      }
    }
  )
 }
 viewPetDetails(id:number){

  console.log("clicked");
  this.router.navigate(['/petDetails',id]);
}



}
