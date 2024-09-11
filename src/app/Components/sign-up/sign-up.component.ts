import { Component, OnInit } from '@angular/core';

import {FormGroup, Validators,ReactiveFormsModule,FormsModule, FormControl, FormBuilder} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { SignUpService } from '../../Services/sign-up.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../Customer/header/header.component";
import { FooterComponent } from "../Customer/footer/footer.component";
import { LoginService } from '../../Services/login.service';
 
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  profileForm: FormGroup;
  isCustomerSignedUp!: boolean;
  isAdminSignedUp!: boolean;
 
  constructor(private fb: FormBuilder,private signUpService:SignUpService,private loginService:LoginService,private router:Router) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    
   
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.signUpService.addData(this.profileForm.value).subscribe({
        next:(data)=>{console.log('Form Submitted!', data);}
      })
      alert("Sign Up Successfull , Go to Login Page")
      this.router.navigate(['/'])
      
    } else {
      // Handle form invalid state
      console.log('Form is invalid');
    }
    
  }
}
