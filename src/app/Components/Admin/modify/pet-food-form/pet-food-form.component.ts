import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PetFoodService } from '../../../../Services/petfood.service';
import { PetFood } from '../../../../models/pets';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-pet-food-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, AdminHeaderComponent],
  templateUrl: './pet-food-form.component.html',
  styleUrl: './pet-food-form.component.css'
})
export class PetFoodFormComponent {
  petFoodForm: FormGroup;

  constructor(
    private petFoodService: PetFoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  )
   {
    this.petFoodForm =this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      type: ['',[Validators.required]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {

  
    const foodIdParam = this.activatedRoute.snapshot.paramMap.get('foodId');
  
    const foodId = foodIdParam ? parseInt(foodIdParam) : null;
    console.log(foodId)
    if (foodId) {
      this.petFoodService.getPetFoodById(foodId).subscribe({
        next: (res: PetFood) => {
          console.log('Fetched Food data:', res);
          this.petFoodForm.patchValue({
            name: res.name,
            brand: res.brand,
            type: res.type,
            quantity: res.quantity,
            price: res.price 
          });
        },
        error: (err) => {
          console.error('Failed to fetch food details', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.petFoodForm.valid) {
      const foodIdParam = this.activatedRoute.snapshot.paramMap.get('foodId');
      const foodId = foodIdParam ? parseInt(foodIdParam) : null;
      if (foodId) {
        this.petFoodService.updatePetFood(foodId, this.petFoodForm.value).subscribe({
          next: () => {
            console.log('Pet food updated successfully');
            this.router.navigate(['/petFoodList']);
          },
          error: (error:any) => {
            console.log('Error updating pet food', error);
          }
        });
      } else {
        this.petFoodService.createPetFood(this.petFoodForm.value).subscribe({
          next: () => {
            console.log('Pet food added successfully');
            this.router.navigate(['/petFoodList']);
          },
          error: (error:any) => {
            console.log('Error adding pet food', error);
          }
        });
      }
    }
  }


}
