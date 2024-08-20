import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { LoginDTO } from '../../models/login.model';
import { LoginResponseDTO } from '../../models/login-response.model';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User | undefined;
  errorMessage: string | undefined;
  loginResponse: LoginResponseDTO | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this.authService.login({ email, password }).subscribe(
        (response: any) => {
          // handle successful login response
          console.log(response);
  
          if (response.jwt === "Invalid email/password supplied") {
            console.log('login error'); // TODO: handle login error appropriately
          } else {
            localStorage.setItem('token', response.jwt); // Save token to local storage
  
            // Assuming the user's role can be determined from the token or response
            const userRole = this.parseRoleFromToken(response.jwt); // Replace with actual method
  
            if (userRole === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error => {
          // handle login error
          console.error(error);
        }
      );
    }
  }

 private parseRoleFromToken(token: string): string {
  // Decode the token to extract user role
  // Use a JWT library to decode the token and extract the role
  return 'user'; // Replace this with actual decoding logic
}

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  onCancel(): void {
    this.loginForm.reset(); 
  }
}
