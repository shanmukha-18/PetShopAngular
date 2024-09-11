import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './access-page.component.html',
  styleUrl: './access-page.component.css'
})
export class AccessPageComponent {
  loginForm!: FormGroup;
  role!:string ;
 
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
                
              }
            } else {
              console.error('Invalid credentials');
              
            }
          },
          error:(error) => {
            console.error('Error occurred:', error);
            
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  
}
