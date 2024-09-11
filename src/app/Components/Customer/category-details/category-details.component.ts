import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetCategory } from '../../../models/pets';
import { PetCategoryServiceService } from '../../../Services/pet-category-service.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
@Input({required:true})  category!:PetCategory;
  categoryId!: number ;
 
  constructor(private route: ActivatedRoute,private categoryDetails:PetCategoryServiceService) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      
    })
    if(this.categoryId){
      this.categoryDetails.getPetCategoryById(this.categoryId).subscribe(
        (data)=>{this.category=data}
      )
     };
  }
}
