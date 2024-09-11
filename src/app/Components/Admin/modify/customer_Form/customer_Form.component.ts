import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../../Services/customer.service';
import { Customer } from '../../../../models/pets';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-customer_Form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminHeaderComponent],
  templateUrl: './customer_Form.component.html',
  styleUrl: './customer_Form.component.css'
})
export class CustomerFormComponent implements OnInit{
  customerForm:FormGroup;
 
  
  constructor(private customerService:CustomerService,private activatedRoute:ActivatedRoute,private router:Router){
   this.customerForm=new FormGroup({
     firstName:new FormControl('',[Validators.required, Validators.minLength(3)]),
     lastName:new FormControl('',[Validators.required, Validators.minLength(3)]),
     email:new FormControl('',[Validators.required]),
     phoneNumber:new FormControl('',[Validators.required]),
     addressId:new FormControl('',[Validators.required]),
   });
   

  }
  ngOnInit(): void {
    const customerIdParam = this.activatedRoute.snapshot.paramMap.get('customerId');
    const customerId = customerIdParam ? parseInt(customerIdParam) : null;
    console.log(customerIdParam)

    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe({
        next: (res: Customer) => {
          console.log('Fetched customer data:', res);
          this.customerForm.patchValue({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNumber: res.phoneNumber,
            addressId: res.address.addressId 
          });
        },
        error: (err) => {
          console.error('Failed to fetch customer details', err);
        }
      });
  }
}



  
  
  onSubmit():void{
  if (this.customerForm.valid) {
    const customerIdParam = this.activatedRoute.snapshot.paramMap.get('customerId');
    const customerId = customerIdParam ? parseInt(customerIdParam) : null;
    if (customerId) {
      // Update existing customer
      this.customerService.updateCustomer(customerId, this.customerForm.value).subscribe({
        next: () => {
          console.log('Customer updated successfully');
          this.router.navigate(['/customerList']);
        },
        error: (error: any) => {
          console.log('Error updating customer', error);
        }
      });
    } else {
      // Add new customer
      this.customerService.addCustomer(this.customerForm.value).subscribe({
        next: () => {
          console.log('Customer added successfully');
          this.router.navigate(['/customerList']);
        },
        error: (error) => {
          console.log('Error adding customer', error);
        }
      });
    }
  }
}
}

