import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetFood, Vaccination } from '../../../../models/pets';
import { VaccinationService } from '../../../../Services/vaccination.service';
import { AdminHeaderComponent } from "../../admin-header/admin-header.component";

@Component({
  selector: 'app-vaccination-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, AdminHeaderComponent],
  templateUrl: './vaccination-form.component.html',
  styleUrl: './vaccination-form.component.css'
})
export class VaccinationFormComponent {
  vaccinationForm: FormGroup;

  constructor(
    private vaccinationService: VaccinationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.vaccinationForm =this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      available: ['', [Validators.required, Validators.min(0)]],
     
      description: [null, [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {


  
    const vaccinationIdParam = this.activatedRoute.snapshot.paramMap.get('vaccinationId');
  
    const vaccinationId = vaccinationIdParam ? parseInt(vaccinationIdParam) : null;
    console.log(vaccinationId)
    if (vaccinationId) {
      this.vaccinationService.getVaccinationById(vaccinationId).subscribe({
        next: (res: Vaccination) => {
          console.log('Fetched vaccination data:', res);
          this.vaccinationForm.patchValue({
            name: res.name,
            available: res.available,
            description: res.description,
          
            price: res.price 
          });
        },
        error: (err) => {
          console.error('Failed to fetch vaccination details', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.vaccinationForm.valid) {
      const vaccinationIdParam = this.activatedRoute.snapshot.paramMap.get('vaccinationId');
  
      const vaccinationId = vaccinationIdParam ? parseInt(vaccinationIdParam) : null;
      if (vaccinationId) {
        this.vaccinationService.updateVaccination(vaccinationId, this.vaccinationForm.value).subscribe({
          next: () => {
            console.log('Pet Vaccination updated successfully');
            this.router.navigate(['/vaccinationList']);
          },
          error: (error:any) => {
            console.log('Error updating pet vaccination', error);
          }
        });
      } else {
        this.vaccinationService.createVaccination(this.vaccinationForm.value).subscribe({
          next: () => {
            console.log('Pet Vaccination added successfully');
            this.router.navigate(['/vaccinationList']);
          },
          error: (error:any) => {
            console.log('Error adding pet vaccination', error);
          }
        });
      }
    }
}
}
