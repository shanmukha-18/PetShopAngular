import { Injectable, OnInit } from '@angular/core';
import { PetFood, Pets } from '../models/pets';


import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsSubject = new BehaviorSubject<any[] | undefined>([])
  cartItems$ = this.cartItemsSubject.asObservable()
  cartLenthSubject=new BehaviorSubject<number>(0)
  cartLength$=this.cartLenthSubject.asObservable()
  private storageKey = 'petCart';
  private storageKey1 = 'petFood';
  getPetsFromCart(): Pets[] {
    const petsJson = localStorage.getItem(this.storageKey);
    
 
 
    return petsJson ? JSON.parse(petsJson) : [];
  }
  getPetFoodsFromCart(): PetFood[] {
    const petFoodJson = localStorage.getItem(this.storageKey1);
    return petFoodJson ? JSON.parse(petFoodJson) : [];
  }
 
  addPetToCart(pet: Pets): void {
    console.log(pet)
    const pets = this.getPetsFromCart();
    // console.log('petsfrom add',pets);
    const existingPet = pets.find(p => p.petId == pet.petId);
    if (existingPet != undefined) {
      pets.map(p => {
        if (p.petId == existingPet.petId) {
          if (p.itemQ != undefined) {
            p.itemQ = p.itemQ + 1
          }
        }
      })
    } else {
      pets.push(pet);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(pets));
    const combinedPetsAndPetFoods = [...this.getPetsFromCart(), ...this.getPetFoodsFromCart()]
    this.cartLenthSubject.next(combinedPetsAndPetFoods.length)
    this.cartItemsSubject.next(combinedPetsAndPetFoods)
  }
  addPetFoodToCart(petFood: PetFood): void {
    console.log(petFood)
    const petFoods = this.getPetFoodsFromCart();
    const existingPetFood = petFoods.find(p => p.foodId == petFood.foodId);
    if (existingPetFood != undefined) {
      petFoods.map(p => {
        if (p.foodId == existingPetFood.foodId) {
          if (p.itemQ != undefined) {
            p.itemQ = p.itemQ + 1
          }
        }
      })
    } else {
      petFoods.push(petFood);
    }
    localStorage.setItem(this.storageKey1, JSON.stringify(petFoods));
    const combinedPetsAndPetFoods = [...this.getPetsFromCart(), ...this.getPetFoodsFromCart()]
    this.cartLenthSubject.next(combinedPetsAndPetFoods.length)
    this.cartItemsSubject.next(combinedPetsAndPetFoods)
  }
 
 
 
  increaseOrDecrease(btn: string, item: any) {
    const petData = localStorage.getItem('petCart');
    const foodData = localStorage.getItem('petFood');
 
    let petParsedData = petData ? JSON.parse(petData) : [];
    let petFoodParsedData = foodData ? JSON.parse(foodData) : [];
 
    console.log("Starting increase/decrease data", petParsedData, petFoodParsedData);
 
    if (btn === 'inc') {
        // Increase quantity
        petParsedData = petParsedData.map((data: any) => {
            if (data.petId === item.petId && data.name === item.name) {
                return { ...data, itemQ: (data.itemQ || 0) + 1 };
            }
            return data;
        });
 
        petFoodParsedData = petFoodParsedData.map((data: any) => {
            if (data.foodId === item.foodId && data.name === item.name) {
                return { ...data, itemQ: (data.itemQ || 0) + 1 };
            }
            return data;
        });
 
        console.log("Increased data", petParsedData, petFoodParsedData);
    } else if (btn === 'dec') {
        // Decrease quantity
        petParsedData = petParsedData.map((data: any) => {
            if (data.petId === item.petId && data.name === item.name) {
                return { ...data, itemQ: Math.max((data.itemQ || 0) - 1, 0) }; // Prevent negative quantity
            }
            return data;
        });
 
        petFoodParsedData = petFoodParsedData.map((data: any) => {
            if (data.foodId === item.foodId && data.name === item.name) {
                return { ...data, itemQ: Math.max((data.itemQ || 0) - 1, 0) }; // Prevent negative quantity
            }
            return data;
        });
 
        console.log("Decreased data", petParsedData, petFoodParsedData);
    }
 
   
    localStorage.setItem('petCart', JSON.stringify(petParsedData));
    localStorage.setItem('petFood', JSON.stringify(petFoodParsedData));
 
   
    const combinedPetsAndPetFoods = [...this.getPetsFromCart(), ...this.getPetFoodsFromCart()];
    this.cartItemsSubject.next(combinedPetsAndPetFoods);
}
removeItem(id: any, name: string) {
  // Get data from localStorage
  const petData = localStorage.getItem('petCart');
  const foodData = localStorage.getItem('petFood');
 
  let petParsedData = petData ? JSON.parse(petData) : [];
  let petFoodParsedData = foodData ? JSON.parse(foodData) : [];
 
  console.log("Starting remove data", petParsedData, petFoodParsedData);
 
  // Remove item from petParsedData
  petParsedData = petParsedData.filter((data: any) => !(data.petId === id && data.name === name));
 
  // Remove item from petFoodParsedData
  petFoodParsedData = petFoodParsedData.filter((data: any) => !(data.foodId === id && data.name === name));
 
  console.log("Data after removal", petParsedData, petFoodParsedData);
 
  // Save updated data to localStorage
  localStorage.setItem('petCart', JSON.stringify(petParsedData));
  localStorage.setItem('petFood', JSON.stringify(petFoodParsedData));
 
  // Combine and update cart items
  const combinedPetsAndPetFoods = [...this.getPetsFromCart(), ...this.getPetFoodsFromCart()];
  this.cartItemsSubject.next(combinedPetsAndPetFoods);
}
 
  setCartItems(items: any[]) {
    this.cartItemsSubject.next(items)
  }
  getTotalPrice(){
    return this.cartItemsSubject.value?.reduce((acc,item)=>((item.itemQ*item.price),0))
  }
  
  removeCart(item:any){
  }
}
