import { Component, Input } from '@angular/core';
import { Pets } from '../../../models/pets';
import { ActivatedRoute, Router } from '@angular/router';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-single-pet',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './single-pet.component.html',
  styleUrl: './single-pet.component.css'
})
export class SinglePetComponent {
 @Input({required:true})pet!:Pets
 count:number=0;

constructor(private router:Router){}


viewPetDetails(id:number){

  console.log("clicked");
  this.router.navigate(['/petDetails',id]);
}


}
