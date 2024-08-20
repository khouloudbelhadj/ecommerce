import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Initialize forgotPasswordForm here
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Optionally handle additional initialization here
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      // Handle form submission
      console.log(this.forgotPasswordForm.value);
      // Implement password reset logic here
    }
  }
}
