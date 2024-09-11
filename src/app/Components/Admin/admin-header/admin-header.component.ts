import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminHomepageComponent } from '../admin-homepage/admin-homepage.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private route:Router){}
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate([''])
   }
   
}
