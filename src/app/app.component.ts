import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PetDetailsComponent } from './Components/Customer/pet-details/pet-details.component';
import { PetCardsComponent } from "./Components/Customer/pet-cards/pet-cards.component";
import { AccessPageComponent } from "./Components/access-page/access-page.component";

import { HeaderComponent } from "./Components/Customer/header/header.component";
import { FooterComponent } from './Components/Customer/footer/footer.component';
import { CustomerFormComponent } from './Components/Admin/modify/customer_Form/customer_Form.component';
import { SupplierFormComponent } from "./Components/Admin/modify/supplier_Form/supplier_Form.component";
import { PetsFormComponent } from './Components/Admin/modify/pets_Form/pets_Form.component';
import { PetsListComponent } from './Components/Admin/list/petsList/petsList.component';
import { CustomerListComponent } from './Components/Admin/list/customerList/customerList.component';
import { SupplierListComponent } from './Components/Admin/list/supplierList/supplierList.component';
import { PetfoodComponent } from './Components/Customer/petfood/petfood.component';
import { PetCategoriesComponent } from "./Components/Customer/pet-categories/pet-categories.component";
import { CartComponent } from "./Components/Customer/cart/cart.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PetCardsComponent, AccessPageComponent, SupplierListComponent, CustomerListComponent, PetsListComponent, HeaderComponent, FooterComponent, CustomerFormComponent, SupplierFormComponent, PetsFormComponent, PetfoodComponent, PetCategoriesComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet_shop';
}
