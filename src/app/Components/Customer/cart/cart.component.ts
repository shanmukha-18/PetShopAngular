import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { PetFood, Pets, Transaction_status, Transactions } from '../../../models/pets';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TransactionService } from '../../../Services/transaction.service';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../../Services/customer.service';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { LoadingComponent } from '../../loading/loading.component';
import { warn } from 'console';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent,LoadingComponent,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Pets[] = [];
  petCartFood!: PetFood;
  tempTrans!: any;
  transaction!: Transactions;
  noOfCustomers!: number;
  noOfPets!: number;
  totalPriceCart!: number;
  originalCartItems!:any[]|undefined
  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private router: Router,
    private customerService: CustomerService,
    private petDetailsService: PetDetailsService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(data => {
      this.originalCartItems = data;
      console.log("in cart",this.originalCartItems)
      this.totalPriceCart = data?.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.itemQ);
      }, 0);
    });
  }

  increase(btn: string, item: any) {
    this.cartService.increaseOrDecrease(btn, item);
  }

 get totalItems(): number {
  if (this.originalCartItems === undefined) {
    return 0;
  }
  return this.originalCartItems.length;
}

  get subtotal(): number {
    // return this.cartItems.reduce((total, item) => total + (item.price * item.itemQ?0), 0);
    return this.originalCartItems?.reduce((total, item) => total + (item.price * (item.itemQ ?? 1)), 0);
  }

  get gst(): number {
    return this.subtotal * 0.09;
  }

  get sgst(): number {
    return this.subtotal * 0.09;
  }

  get totalPrice(): number {
    return this.gst + this.sgst + this.subtotal;
  }

  buyNow() {
  
    this.customerService.getAllCustomers().subscribe({
      next:(data)=>{this.noOfCustomers=data.length}
    });

    this.petDetailsService.getAllPets().subscribe({
      next:(data)=>{this.noOfPets=data.length}
    })

    this.tempTrans = {
      customerId: Math.floor(Math.random() * this.noOfCustomers) + 1,
      petId: Math.floor(Math.random() * this.noOfPets) + 1,
      transactionDate: new Date(),
      amount: this.totalPrice,
      transactionStatus: Transaction_status.Success
    };

    console.log("adding data", this.tempTrans);

    this.transactionService.addTransactions(this.tempTrans).subscribe(data => {
      this.transaction = data;

      this.transactionService.getTransactionById(this.transaction.transactionId).subscribe(data => {
        this.transaction = data;
        console.log("getting data", this.transaction);
      });
      alert("proceeding to Buy")
      this.loadPayment(this.transaction.transactionId);
      localStorage.removeItem('petCart')
      localStorage.removeItem('petFood')
    });
  }

   loadPayment(transactionId: number) {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/payment', transactionId]);
    }, 1500);
  }

  removeFromCart(id: any, name: any) {
    this.cartService.removeItem(id, name);

  }
  doneHandler(){

  }
}
