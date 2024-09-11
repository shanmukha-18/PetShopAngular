import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transactions } from '../models/pets';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  private apiUrl="http://localhost:8082/api/v1/transaction_history"
 
 
  constructor(private http:HttpClient) { }
  getAllTransactions():Observable<Transactions[]>{
    return this.http.get<Transactions[]>(this.apiUrl+'/get')
  }
  getTransactionById(transactionId:number):Observable<Transactions>{
    return this.http.get<Transactions>(`${this.apiUrl}/${transactionId}`);
  }

  getAllSuccessfulTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.apiUrl}/successful`);
  }

  getAllFailedTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.apiUrl}/failed`);
  }

  getTransactionsByCustomerId(customerId: number): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/by_customer/${customerId}`);
  }

  getTransactionsByCustomerName(customerName: string): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.apiUrl}/by_customer_name/${customerName}`);
  }
  addTransactions(transactions:Transactions):Observable<Transactions>{
    return this.http.post<Transactions>(`${this.apiUrl}/add`,transactions);
  }
}
