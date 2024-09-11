// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { ReactiveFormsModule,FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { PetCategory, PetFood, Pets, Vaccination } from '../../../../models/pets';
// import { PetDetailsService } from '../../../../Services/pet-details.service';
// import { PetCategoryServiceService } from '../../../../Services/pet-category-service.service';
// import { SuppliersService } from '../../../../Services/suppliers.service';
// import { VaccinationService } from '../../../../Services/vaccination.service';
// import { PetFoodService } from '../../../../Services/petfood.service';
// import { Supplier } from '../../../../models/pets';
// @Component({
//   selector: 'app-pets_Form',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './pets_Form.component.html',
//   styleUrl: './pets_Form.component.css'
// })
// export class PetsFormComponent implements OnInit {
//   petForm:FormGroup;
//   categories: number[] = [];


//   constructor(
//     private petDetailsService:PetDetailsService,
//     private petCategoriesService:PetCategoryServiceService,
//     private supplierService:SuppliersService,
//     private vaccinationService:VaccinationService,
//     private petFoodService:PetFoodService,
//     private activatedRoute:ActivatedRoute,
//     private router:Router){
//    this.petForm=new FormGroup({
//      name:new FormControl('',[Validators.required]),
//      breed:new FormControl('',[Validators.required]),
//     //  imageUrl:new FormControl('',[Validators.required]),
//      imageUrl:new FormControl('',[Validators.required]),
//      age:new FormControl('',[Validators.required]),
//      price:new FormControl('',[Validators.required]),
//      categoryId:new FormControl('',[Validators.required]),
//      supplierId:new FormControl('',[Validators.required]),
//      petFoodId:new FormControl('',[Validators.required]),
//      description:new FormControl('',[Validators.required]),

//     });
  
//   }


//   ngOnInit(): void {
//     const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
//     const petId = petIdParam ? parseInt(petIdParam) : null;
//     console.log(petIdParam)

//     if (petId) {
//       this.petDetailsService.getPetById(petId).subscribe({
//         next: (res: Pets) => {
//           console.log('Fetched Pet data:', res); // Debug log
//           this.petForm.patchValue({
//             name: res.name,
//             breed: res.breed,
//             imageUrl: res.imageUrl,
//             age: res.age,
//             price: res.price,
//             description: res.description,
//             categoryId: res.category.categoryId,
//             suppplierId: res.supplier.supplierId,
//             petFoodId:res.petFood.foodId,
            
//           });
//         },
//         error: (error:any) => {
//           console.error('Failed to fetch pet details', error);
//         }
//       });
//   }

//   this.loadCategories();
 
// }
//   onSubmit(){

// if (this.petForm.valid) {
//   const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
//   const petId = petIdParam ? parseInt(petIdParam) : null;
//   if (petId) {
  
//     this.petDetailsService.updatePet(petId, this.petForm.value).subscribe({
//       next: () => {
//         console.log('Pet updated successfully');
//         this.router.navigate(['/petList']);
//       },
//       error: (error: any) => {
//         console.log('Error updating pet', error);
//       }
//     });
//   } else {
  
//     this.petDetailsService.addPet(this.petForm.value).subscribe({
//       next: () => {
//         console.log('Pet added successfully');
//         this.router.navigate(['/petList']);
//       },
//       error: (error: any) => {
//         console.log('Error adding pet', error);
//       }
//     });
//   }
// }
// }
// loadCategories(): void {
//   // Example implementation - replace with your actual service call
//   this.petCategoriesService.getAllPetCategories().subscribe(categories => {
//     this.categories=categories.map(data=>data.categoryId)
  
//    });

//    this.supplierService.getAllSuppliers().subscribe(suppliers => {
//     this.suppliers=suppliers.map(data=>data.supplierId)
  
//    });
//    this.petFoodService.getAllPetFood().subscribe(petFood => {
//     this.petFoods=petFood.map(data=>data.foodId)
  
//    });
   
// }

// }
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { PetDetailsService } from '../../../../Services/pet-details.service';
// import { Pets } from '../../../../models/pets';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { PetCategoryServiceService } from '../../../../Services/pet-category-service.service';
 
// @Component({
//   selector: 'app-pets_Form',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './pets_Form.component.html',
//   styleUrl: './pets_Form.component.css'
// })
// export class PetsFormComponent implements OnInit{
//   petForm:FormGroup;
 
//   constructor(private petDetailsService:PetDetailsService,private activatedRoute:ActivatedRoute,private router:Router,private categoryService:PetCategoryServiceService){
//    this.petForm=new FormGroup({
//      name:new FormControl('',[Validators.required]),
//      breed:new FormControl('',[Validators.required]),
//     //  imageUrl:new FormControl('',[Validators.required]),
//      imageUrl:new FormControl('',[Validators.required]),
//      age:new FormControl('',[Validators.required]),
//      price:new FormControl('',[Validators.required]),
//      categoryId:new FormControl('',[Validators.required]),
//      description:new FormControl('',[Validators.required]),
//    })

//   }

 
//   ngOnInit(): void {
//     const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
//     const petId = petIdParam ? parseInt(petIdParam) : null;
//     console.log(petIdParam)
 
//     if (petId) {
//       this.petDetailsService.getPetById(petId).subscribe({
//         next: (res: Pets) => {
//           console.log('Fetched Pet data:', res); // Debug log
//           this.petForm.patchValue({
//             name: res.name,
//             breed: res.breed,
//             imageUrl: res.imageUrl,
//             age: res.age,
//             price: res.price,
//             description: res.description,
//             categoryId: res.category.categoryId
//           });
//         },
//         error: (error:any) => {
//           console.error('Failed to fetch pet details', error);
//         }
//       });
//   }
// }

//   onSubmit(){
//  console.log(this.petForm.value)
// if (this.petForm.valid) {
//   const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
//   const petId = petIdParam ? parseInt(petIdParam) : null;
//   if (petId) {
 
//     this.petDetailsService.updatePet(petId, this.petForm.value).subscribe({
//       next: () => {
//         console.log('Pet updated successfully');
//         this.router.navigate(['/petList']);
//       },
//       error: (error: any) => {
//         console.log('Error updating pet', error);
//       }
//     });
//   } 
//   else {
 
//     this.petDetailsService.addPet(this.petForm.value).subscribe({
//       next: () => {
//         console.log('Pet added successfully',this.petForm.value);
//         this.router.navigate(['/petList']);
//       },
//       error: (error: any) => {
//         console.log('Error adding pet', error);
//       }
//     });
//   }
// }
// }
// }
 // // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// // import { ReactiveFormsModule,FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // import { PetCategory, PetFood, Pets, Vaccination } from '../../../../models/pets';
// // import { PetDetailsService } from '../../../../Services/pet-details.service';
// // import { PetCategoryServiceService } from '../../../../Services/pet-category-service.service';
// // import { SuppliersService } from '../../../../Services/suppliers.service';
// // import { VaccinationService } from '../../../../Services/vaccination.service';
// // import { PetFoodService } from '../../../../Services/petfood.service';
// // import { Supplier } from '../../../../models/pets';
// // @Component({
// //   selector: 'app-pets_Form',
// //   standalone: true,
// //   imports: [ReactiveFormsModule,CommonModule],
// //   templateUrl: './pets_Form.component.html',
// //   styleUrl: './pets_Form.component.css'
// // })
// // export class PetsFormComponent implements OnInit {
// //   petForm:FormGroup;
// //   categories: number[] = [];


// //   constructor(
// //     private petDetailsService:PetDetailsService,
// //     private petCategoriesService:PetCategoryServiceService,
// //     private supplierService:SuppliersService,
// //     private vaccinationService:VaccinationService,
// //     private petFoodService:PetFoodService,
// //     private activatedRoute:ActivatedRoute,
// //     private router:Router){
// //    this.petForm=new FormGroup({
// //      name:new FormControl('',[Validators.required]),
// //      breed:new FormControl('',[Validators.required]),
// //     //  imageUrl:new FormControl('',[Validators.required]),
// //      imageUrl:new FormControl('',[Validators.required]),
// //      age:new FormControl('',[Validators.required]),
// //      price:new FormControl('',[Validators.required]),
// //      categoryId:new FormControl('',[Validators.required]),
// //      supplierId:new FormControl('',[Validators.required]),
// //      petFoodId:new FormControl('',[Validators.required]),
// //      description:new FormControl('',[Validators.required]),

// //     });
  
// //   }


// //   ngOnInit(): void {
// //     const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
// //     const petId = petIdParam ? parseInt(petIdParam) : null;
// //     console.log(petIdParam)

// //     if (petId) {
// //       this.petDetailsService.getPetById(petId).subscribe({
// //         next: (res: Pets) => {
// //           console.log('Fetched Pet data:', res); // Debug log
// //           this.petForm.patchValue({
// //             name: res.name,
// //             breed: res.breed,
// //             imageUrl: res.imageUrl,
// //             age: res.age,
// //             price: res.price,
// //             description: res.description,
// //             categoryId: res.category.categoryId,
// //             suppplierId: res.supplier.supplierId,
// //             petFoodId:res.petFood.foodId,
            
// //           });
// //         },
// //         error: (error:any) => {
// //           console.error('Failed to fetch pet details', error);
// //         }
// //       });
// //   }

// //   this.loadCategories();
 
// // }
// //   onSubmit(){

// // if (this.petForm.valid) {
// //   const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
// //   const petId = petIdParam ? parseInt(petIdParam) : null;
// //   if (petId) {
  
// //     this.petDetailsService.updatePet(petId, this.petForm.value).subscribe({
// //       next: () => {
// //         console.log('Pet updated successfully');
// //         this.router.navigate(['/petList']);
// //       },
// //       error: (error: any) => {
// //         console.log('Error updating pet', error);
// //       }
// //     });
// //   } else {
  
// //     this.petDetailsService.addPet(this.petForm.value).subscribe({
// //       next: () => {
// //         console.log('Pet added successfully');
// //         this.router.navigate(['/petList']);
// //       },
// //       error: (error: any) => {
// //         console.log('Error adding pet', error);
// //       }
// //     });
// //   }
// // }
// // }
// // loadCategories(): void {
// //   // Example implementation - replace with your actual service call
// //   this.petCategoriesService.getAllPetCategories().subscribe(categories => {
// //     this.categories=categories.map(data=>data.categoryId)
  
// //    });

// //    this.supplierService.getAllSuppliers().subscribe(suppliers => {
// //     this.suppliers=suppliers.map(data=>data.supplierId)
  
// //    });
// //    this.petFoodService.getAllPetFood().subscribe(petFood => {
// //     this.petFoods=petFood.map(data=>data.foodId)
  
// //    });
   
// // }

// // }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


import { PetDetailsService } from '../../../../Services/pet-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PetCategoryServiceService } from '../../../../Services/pet-category-service.service';
import { SuppliersService } from '../../../../Services/suppliers.service';
import { PetFoodService } from '../../../../Services/petfood.service';
import { VaccinationService } from '../../../../Services/vaccination.service';
import { PetCategory, PetFood, Pets, Supplier, Vaccination } from '../../../../models/pets';
import { CommonModule } from '@angular/common';
import { DTO } from '../../../../models/dto';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";


@Component({
  selector: 'app-pets_Form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AdminHeaderComponent],
  templateUrl: './pets_Form.component.html',
  styleUrl: './pets_Form.component.css'
})
export class PetsFormComponent implements OnInit {
  petsForm: FormGroup;
  categories :PetCategory[]=[]; 
  petFoods:PetFood[] =[];
  vaccinations:Vaccination[] = []; 
  suppliers:Supplier[] = [];

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private petService: PetDetailsService,
    private petCategoriesService:PetCategoryServiceService,
        private supplierService:SuppliersService,
        private vaccinationService:VaccinationService,
        private petFoodService:PetFoodService,
    
    private activatedRoute:ActivatedRoute) {
      this.petsForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        breed: ['', [Validators.required, Validators.minLength(3)]],
        age: [, [Validators.required, Validators.min(0)]],
        price: [, [Validators.required, Validators.min(0)]],
        categoryName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]],
        petFoodNames: [[], [Validators.required]],
        vaccinationNames: [[], [Validators.required]],
        supplierNames: [[], [Validators.required]]
      });
    }
    ngOnInit(): void {

      const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
      const petId = petIdParam ? parseInt(petIdParam,10) : null;
  
      if (petId) {
        this.petService.getPetById(petId).subscribe({
          next: (res: Pets) => {
            console.log('Fetched Pet data:', res); 
            this.petsForm.patchValue({
              name: res.name,
              breed: res.breed,
              imageUrl: res.imageUrl,
              age: res.age,
              price: res.price,
              description: res.description,
              categoryName: res.category.name, 
              petFoodNames: res.petFoods.map(food => food.name),
              vaccinationNames: res.petVaccinations.map(vaccine => vaccine.name), 
              supplierNames: res.petSuppliers.map(supplier => supplier.name) 
            });
          },
          error: (error: any) => {
            console.error('Failed to fetch pet details', error);
          }
        });
      }
      this.loadCategories();
      this.loadPetFoods();
      this.loadVaccinations();
      this.loadSuppliers();
      }


      onSubmit(): void {
        if (this.petsForm.valid) {
          const petIdParam = this.activatedRoute.snapshot.paramMap.get('petId');
          const petId = petIdParam ? parseInt(petIdParam,10) : null;
         
          if (petId) {
            this.petService.updatePet(petId, this.petsForm.value).subscribe({
              next: () => {
                console.log('Pet updated successfully');
                this.router.navigate(['/petList']);
              },
              error: (error: any) => {
                console.log('Error updating pet', error);
              }
            });
          } else {
            this.petService.addPet(this.petsForm.value).subscribe({
              next: () => {
                console.log('Pet added successfully');
                this.router.navigate(['/petList']);
              },
              error: (error: any) => {
                console.log('Error adding pet', error);
              }
            });
          }
        }
      }
      loadCategories(): void {
        this.petCategoriesService.getAllPetCategories().subscribe(data => {
          this.categories = data;
        });
      }
    
      loadPetFoods(): void {
        this.petFoodService.getAllPetFood().subscribe(data => {
          this.petFoods = data;
        });
      }
    
      loadVaccinations(): void {
        this.vaccinationService.getVaccinations().subscribe(data => {
          this.vaccinations = data;
        });
      }
    
      loadSuppliers(): void {
        this.supplierService.getAllSuppliers().subscribe(data => {
          this.suppliers = data;
        });
      }

    }
