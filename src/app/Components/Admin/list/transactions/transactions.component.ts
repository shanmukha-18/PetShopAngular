import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Transactions } from '../../../../models/pets';
import { TransactionService } from '../../../../Services/transaction.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, AdminHeaderComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{
  p:number=1;
  transactions:Transactions[]=[]
  successfulTransactions: Transactions[] = [];
 
  selectedCustomerId: number | null = null;
  filterType: string = ''; 
  customerId: number | null = null;
  customerName: string ='';
  constructor(private transactionService:TransactionService, private router:Router){}
 
  ngOnInit(): void {
    if(this.filterType){
      this.filterByType()
    }
    else if(this.customerName){
      this.filterByCustomerName(this.customerName)
    }

    else{

      this.loadAllTransactions();
    }
  }

  loadAllTransactions(){
    this.transactionService.getAllTransactions().subscribe({
      next:(data)=>this.transactions=data
});
  }

  filterByCustomerName(customerName:string): void {
    
      this.transactionService.getTransactionsByCustomerName(customerName).subscribe(data => {
        this.transactions = data;
        console.log(this.transactions)
      });
    
  }
  filterByType(): void {
    if (this.filterType === 'successful') {
      this.transactionService.getAllSuccessfulTransactions().subscribe(data => {
        this.transactions = data;
      });
    } else if (this.filterType === 'failed') {
      this.transactionService.getAllFailedTransactions().subscribe(data => {
        this.transactions = data;
      });
    }
  }

  clearFilters(): void {
    this.customerId = 0;
    this.filterType = '';
    this.customerName=''
   this.loadAllTransactions()
  }



}
