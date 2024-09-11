import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { NgxPaginationModule } from 'ngx-pagination';
import { VaccinationService } from '../../../../Services/vaccination.service';
import { Vaccination } from '../../../../models/pets';
import { error } from 'console';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-vaccination-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, RouterLink, FormsModule, AdminHeaderComponent],
  templateUrl: './vaccination-list.component.html',
  styleUrl: './vaccination-list.component.css'
})
export class VaccinationListComponent implements OnInit{
 p:number=1;
 vaccinations:Vaccination[]=[];
 constructor(private vaccinationService:VaccinationService){}
 ngOnInit(): void {
  this.loadVaccinations();
}
loadVaccinations(){
  this.vaccinationService.getVaccinations().subscribe(
    {
      next:(data)=>{this.vaccinations=data,console.log(data)},
      error:(error)=>{console.log("failed to load vaccinations",error)}
    }
  )
}
}
