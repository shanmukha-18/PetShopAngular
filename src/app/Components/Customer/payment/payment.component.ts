import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from '../../../models/pets';
import { TransactionService } from '../../../Services/transaction.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
 
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit{
 
  // @Input({required:true}) transactionId!:number;
  transactionId!:number
  transaction!:Transactions
 
  constructor(private transactionService: TransactionService,private route:ActivatedRoute){
    route.paramMap.subscribe({
      next:(data)=>{
        this.transactionId=parseInt(data.get('id')!)
      }
    })
  }
  ngOnInit(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next:(data)=>{this.transaction=data, console.log("printing",data)}
    })
  }
 
 
 
 
}