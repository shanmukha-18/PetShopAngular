import { PetCategory, PetFood, Vaccination, Supplier } from './pets';

export interface DTO {
    petId?: number;
    breed: string;
    age: number;
    price: number;
    categoryName: string; 
    description?: string; 
    imageUrl?: string; 
    petFoodNames: string[]; 
    vaccinationNames: string[]; 
    supplierNames: string[]; 
}
