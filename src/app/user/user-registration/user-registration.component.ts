import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Role } from '../../models/role.enum';
import { Status } from '../../models/status.enum'; 


import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  roles = Object.values(Role);
  statuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      code: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mf: ['', Validators.required],  
      ville: ['', Validators.required],  
      phoneNumber: ['', Validators.required],
      adress: this.fb.group({
        id: [0],
        street: ['', Validators.required],  
        
        houseNumber: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['user/login']); 
        },
        error: (err) => {
          console.error('Error registering user', err);
          alert('Registration failed');
        }
      });
    }
  }

  onCancel(): void {
    this.registrationForm.reset();
    this.router.navigate(['/user/registration']); 
  }
}
