import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../models/role.enum';
import { Status } from '../../models/status.enum';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserFormComponent implements OnInit {
  isEditMode = false;
  userForm!: FormGroup;

  roles = Object.values(Role);
  statuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [0],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mf: ['', Validators.required],
      ville: ['', Validators.required],
      role: [[], Validators.required],
      status: [Status.PENDING, Validators.required],
      adress: this.fb.group({
        id: [0],
        street: [''],
        houseNumber: [''],
        zipCode: ['']
      })
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.userService.get(id).subscribe({
          next: (user) => {
            this.userForm.patchValue({
              ...user,
              status: user.status
            });
          },
          error: (err) => console.error('Error fetching user', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const payload = {
        ...formValue,
        status: formValue.status
      };

      if (this.isEditMode) {
        this.userService.update(payload).subscribe({
          next: () => {
            alert('User updated successfully'); 
            this.router.navigate(['/user/list']);
          },
          error: (err) => {
            console.error('Error updating user', err);
            alert('Error updating user'); 
          }
        });
      } else {
        this.userService.add(payload).subscribe({
          next: () => {
            alert('User added successfully'); 
            this.router.navigate(['/user/list']);
          },
          error: (err) => {
            console.error('Error adding user', err);
            alert('Error adding user'); 
          }
        });
      }
    }
  }

  onDelete(): void {
    const id = this.userForm.get('id')?.value;
    if (id) {
      this.userService.delete(id).subscribe({
        next: () => {
          alert('User deleted successfully'); 
          this.router.navigate(['/user/list']);
        },
        error: (err) => {
          console.error('Error deleting user', err);
          alert('Error deleting user');
        }
      });
    }
  }
}
