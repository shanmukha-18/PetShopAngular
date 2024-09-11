import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from '../../../Services/vaccination.service';
 
 
@Component({
  selector: 'app-vaccinationservices',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule, HeaderComponent, FooterComponent],
  templateUrl: './vaccinationservices.component.html',
  styleUrl: './vaccinationservices.component.css'
})
export class ServicesComponent {
  vaccination:any = {};
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  timeSlots: string[] = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ];
 
  constructor(private snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute, private vaccinationService: VaccinationService, private dialog:MatDialog) {}
  ngOnInit(): void {
   
      this.route.paramMap.subscribe(params => {
        const idString = params.get('id');
        const id = idString ? parseInt(idString, 10) : null;
        // const id: number = parseInt(id, 10)
        if (id) {
          this.vaccinationService.getVaccinationById(id).subscribe(data => {
            this.vaccination = data;
          }, error => {
            this.snackBar.open('Error fetching vaccination data.', 'Close', {
              duration: 2000,
              panelClass: ['snack-bar-error']
            });
          });
        } else {
      this.snackBar.open('No vaccination data found.', 'Close', {
        duration: 2000,
        panelClass: ['snack-bar-error']
      });
    }
  });
}
 
bookAppointment() {
  console.log('Book Appointment method called');
  if (!this.selectedDate || !this.selectedTime) {
    alert('Please select both date and time.')
    // this.snackBar.open('Please select both a date and a time.', 'Close', {
    //   duration: 2000,
    //   panelClass: ['snack-bar-error']
    // });
    return;
  }
  else{
    alert('Appointment Booked Successfully.')
    this.router.navigate(['/customerHome'])
  // this.snackBar.open('Appointment successfully booked!', 'Close', {
  //   duration: 3000,
  //   panelClass: ['snack-bar-success']
  // });
}
 
  this.selectedDate = null;
  this.selectedTime = null;
 
}
}