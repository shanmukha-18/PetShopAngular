
export interface Pets {
    petId: number;
    name: string;
    breed: string;
    age: number;
    price: number;
    category: PetCategory; 
    description: string; 
    imageUrl: string; 
    petFoods: PetFood[]; 
    petVaccinations: Vaccination[]; 
    petSuppliers: Supplier[];
    itemQ?:number
  }



  

  export interface PetCategory {
    categoryId: number;
    name: string;
    
  }
  
  export interface PetFood {
    foodId: number;
    name: string;
    brand: string; 
    type: string; 
    quantity: number;
    price: number;
    itemQ?:number
  }
  
  // vaccination.interface.ts
  
  export interface Vaccination {
    vaccinationId: number;
    name: string;
    description: string; 
    price: number;
    available: number; 
  }
  
  // supplier.interface.ts
  
  export interface Supplier {
    supplierId: number;
    name: string;
    contactPerson: string; 
    phoneNumber: string;
    email: string;
    address: Address;
    // petIds?:number[];
   
  }
  
  // address.interface.ts
  
  export interface Address {
    addressId: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }

  // customer
  export interface Customer {
    customerId:number;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    address:Address;
       
}
export interface User{
  username:string;
  role:string;
  password:string;
}
export interface Transactions{
  transactionId:number;
  customer:Customer;
  transactionDate:Date;
  amount:number;
  transactionStatus:Transaction_status
 
 
}
export enum Transaction_status{
    Failed,
	Success
}

