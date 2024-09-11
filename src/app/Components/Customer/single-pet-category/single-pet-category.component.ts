import { Component, Input, OnInit } from '@angular/core';
import { PetCategory, Pets } from '../../../models/pets';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-single-pet-category',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './single-pet-category.component.html',
  styleUrl: './single-pet-category.component.css'
})
export class SinglePetCategoryComponent implements OnInit{
  @Input({required:true})category!:PetCategory

  pets: Pets[] = [];
  categoryName!: string;
  currentPath!:string|null;

  constructor(private router:Router,
    private route: ActivatedRoute,
    private petService: PetDetailsService
  ) {}

  ngOnInit(): void {
    // this.categoryName = this.route.snapshot.paramMap.get('name') as string; 
    // this.getPetsByCategoryName(this.categoryName); 
    this.route.paramMap.subscribe(params=>{
      this.currentPath=params.get('name')
      if(this.currentPath!=null){
        this.petService.getPetsByCategory(this.currentPath).subscribe(data=>{
          this.pets=data
        })
       
      }
  }
  // getPetsByCategoryName(categoryName: string): void {
  //   this.petService.getPetsByCategory(categoryName).subscribe(
  //     {
  //       next:(data)=>{this.pets=data},
  //       error:(error)=>{console.log('Error fetching names',error)}
  //     }
      
    
        // (data) => {
        //   console.log(data);
        //   this.pets = data; // Assign the fetched pets to the component property
        // },
        // (error) => {
        //   console.error('Error fetching pets:', error);
        //   // Optionally, show an error message to the user
        // }
        );
      }

}
