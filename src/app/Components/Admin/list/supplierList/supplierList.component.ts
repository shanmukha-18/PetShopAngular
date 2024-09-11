import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SuppliersService } from '../../../../Services/suppliers.service';
import { Supplier } from '../../../../models/pets';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";
 
@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, AdminHeaderComponent],
  templateUrl: './supplierList.component.html',
  styleUrl: './supplierList.component.css'
})
export class SupplierListComponent {
   p!:number;
   suppliers: Supplier[] = []; 
  
 
   city!: string; 
   name!: string; 
 
   constructor(private supplierService: SuppliersService, private router: Router) {}
 
   ngOnInit(): void {
    
     if (this.city) {
       this.filterByCity(this.city);
     } else if (this.name) {
       this.searchByName(this.name);
     } else {
       this.loadAllSuppliers();
     }
   }
 
   loadAllSuppliers(): void {
     this.supplierService.getAllSuppliers().subscribe({
       next: (data) => this.suppliers = data,
       error: (err) => console.error('Failed to load suppliers', err)
     });
   }
 
   filterByCity(city: string): void {
     this.supplierService.getSupplierByCity(city).subscribe({
       next: (data) => {
         this.suppliers = data;
         console.log('Suppliers filtered by city:', data);
       },
       error: (err) => console.error('Failed to filter suppliers by city', err)
     });
   }
 
   searchByName(name: string): void {
     this.supplierService.getSupplierByName(name).subscribe({
       next: (data) => {
         this.suppliers = [data];
         console.log('Supplier found by name:', data);
       },
       error: (err) => console.error('Failed to search supplier by name', err)
     });
   }
 
   clearFilters(): void {
     this.city = '';
     this.name = '';
     this.loadAllSuppliers();
   }

}
