import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryDetailsComponent } from "../category-details/category-details.component";
import { PetCategory } from '../../../models/pets';
import { SinglePetCategoryComponent } from "../single-pet-category/single-pet-category.component";
import { PetCategoryServiceService } from '../../../Services/pet-category-service.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-pet-categories',
  standalone: true,
  imports: [CommonModule, SinglePetCategoryComponent, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './pet-categories.component.html',
  styleUrl: './pet-categories.component.css'
})
export class PetCategoriesComponent implements OnInit {
  categories:PetCategory[]=[]
 
  constructor(private petCategoryDetailsService:PetCategoryServiceService,private router:Router){}
  ngOnInit(): void {
    this.loadAllPetCategories();
  }
  loadAllPetCategories(){
  this.petCategoryDetailsService.getAllPetCategories().subscribe(
    {
      next:(data)=>{
        this.categories=data;
        console.log(data)
      }
    }
  )
 }



  
}