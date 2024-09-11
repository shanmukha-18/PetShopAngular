import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule,FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuppliersService } from '../../../../Services/suppliers.service';
import { Pets, Supplier } from '../../../../models/pets';
import { PetDetailsService } from '../../../../Services/pet-details.service';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";
@Component({
  selector: 'app-supplier_Form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminHeaderComponent],
  templateUrl: './supplier_Form.component.html',
  styleUrl: './supplier_Form.component.css'
})
export class SupplierFormComponent implements OnInit{
  supplierForm!:FormGroup;
  petIds:number[]=[]
 
  constructor(private supplierService:SuppliersService,private activatedRoute:ActivatedRoute,private router:Router,private petService:PetDetailsService){
   this.supplierForm=new FormGroup({
     name:new FormControl('',[Validators.required, Validators.minLength(3)]),
     contactPerson:new FormControl('',[Validators.required, Validators.minLength(3)]),
     phoneNumber:new FormControl('',[Validators.required]),
     email:new FormControl('',[Validators.required,Validators.email]),
     addressId:new FormControl('',[Validators.required]),
     petIds:new FormControl([],[Validators.required]),
   })
  }


  ngOnInit(): void {
    const supplierIdParam = this.activatedRoute.snapshot.paramMap.get('supplierId');
    const supplierId = supplierIdParam ? parseInt(supplierIdParam) : null;
    console.log(supplierIdParam)

    if (supplierId) {
      this.supplierService.getSupplierById(supplierId).subscribe({
        next: (res: Supplier) => {
          console.log('Fetched Supplier data:', res);
          this.supplierForm.patchValue({
            name: res.name,
            contactPerson: res.contactPerson,
            email: res.email,
            phoneNumber: res.phoneNumber,
            addressId: res.address.addressId
          });
        },
        error: (error:any) => {
          console.error('Failed to fetch Supplier details', error);
        }
      });
  }

  this.petService.getAllPets().subscribe(data=>{
    this.petIds=data.map(pet=>pet.petId)
    console.log(data)
  });
}

  onSubmit():void{

 

  if (this.supplierForm.valid) {
    const supplierIdParam = this.activatedRoute.snapshot.paramMap.get('supplierId');
    const supplierId = supplierIdParam ? parseInt(supplierIdParam) : null;
    if (supplierId) {
    
      this.supplierService.updateSupplier(supplierId, this.supplierForm.value).subscribe({
        next: () => {
          console.log('Supplier updated successfully');
          this.router.navigate(['/supplierList']);
        },
        error: (error: any) => {
          console.log('Error updating supplier', error);
        }
      });
    } else {
     
      this.supplierService.addSupplier(this.supplierForm.value).subscribe({
        next: () => {
          console.log('Supplier added successfully');
          this.router.navigate(['/supplierList']);
        },
        error: (error) => {
          console.log('Error adding supplier', error);
        }
      });
    }
  }
}
populatePetIds(){
  
}




}

