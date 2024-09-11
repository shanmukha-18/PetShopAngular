
import { Component, NgModule, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../models/pets';
import { CustomerService } from '../../../../Services/customer.service';
import { Router, RouterLink } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, NgModel } from '@angular/forms';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";
@Component({
  selector: 'app-customerList',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, AdminHeaderComponent],
  templateUrl: './customerList.component.html',
  styleUrl: './customerList.component.css'
})
export class CustomerListComponent implements OnInit {

 p:number=1
  customers:Customer[]=[]
  city: string = ''; 
  state: string = ''; 
  firstName: string = ''; 
  lastName: string = '';
  constructor(private customerService:CustomerService, private router:Router){}
 
  ngOnInit(): void {
   if(this.city){
    this.filterByCity(this.city);
   }
   else if(this.state){
    this.filterByState(this.state)
   }
   else if(this.firstName,this.lastName){
    this.searchByName();
   }
   else{

     this.loadAllCustomers();
    }
  }


  loadAllCustomers(){
    this.customerService.getAllCustomers().subscribe({
      next:(data)=>{this.customers=data;console.log(data)}
    })
  }
  
    filterByCity(city: string): void {
      
      this.customerService.getCustomersByCity(city).subscribe({
        next:(data)=>{this.customers=data;console.log(data)}
      });
    }
  filterByState(state: string): void {
     
   this.customerService.getCustomersByState(state).subscribe({
    next:(data)=>{this.customers=data;console.log(data)}
  });
  }

  searchByName(){
    this.customerService.findCustomerByName(this.firstName, this.lastName).subscribe({

      next:(customer) =>{this.customers= [customer];}
    });
    }

  clearFilters(): void {
    this.city = '';
    this.state = '';
    this.firstName = '';
    this.lastName = '';
    this.loadAllCustomers();
  }

  
  


  
 
 
}