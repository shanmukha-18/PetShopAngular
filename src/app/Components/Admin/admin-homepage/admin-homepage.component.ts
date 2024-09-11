import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [RouterLink,AdminHeaderComponent],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {

}
