import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterStateSnapshot } from "@angular/router";
import { LoginService } from '../../Services/login.service';
import { HeaderComponent } from "../Customer/header/header.component";
import { FooterComponent } from "../Customer/footer/footer.component";
import { User } from '../../models/pets';
import { error } from 'console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  role!:string ;
  errorMessage: string = '';
 
  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService:LoginService
  ) {}
 
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.role = params['role'] || '';
    });
 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

   
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
  
      
      this.loginService.getData(credentials.username, credentials.password).subscribe(
        {
          next:(response) => {

          console.log(response);
          
          
            if (response.username === credentials.username && response.password === credentials.password) {
              localStorage.setItem('user', 'loggedIn');
              localStorage.setItem('role', response.role); 
              this.role = response.role; 
              console.log(response)
              
              if (this.role === 'admin') {
                console.log(this.role)
                this.router.navigate(['/ownerHome']);
              }
              if (this.role === 'customer') {
                console.log(this.role)
                this.router.navigate(['/customerHome']);
              } else {
                console.error('Unknown role');
                this.errorMessage = 'Unknown role';
                
              }
            } 
            else {
              alert('Invalid credentials')
              this.errorMessage = 'Invalid credentials';
              console.error('Invalid credentials');
              
            }
          },
          error:(error) => {
            console.error('Error occurred:', error);
            this.errorMessage = 'An error occurred. Please try again later.'; 
            
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  

  
}
