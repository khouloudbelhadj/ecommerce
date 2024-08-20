import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  standalone: true,
  styleUrls: ['./notification-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class NotificationFormComponent implements OnInit {
  notificationForm!: FormGroup;
  isEditMode = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public router: Router,  // Changed to public
    private route: ActivatedRoute
  ) {
    this.notificationForm = this.fb.group({
      id: [0],
      content: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.notificationService.get(id).subscribe({
          next: (notification) => this.notificationForm.patchValue(notification),
          error: (err) => console.error('Error fetching notification', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      if (this.isEditMode) {
        this.notificationService.update(this.notificationForm.value).subscribe({
          next: () => {
            this.displaySuccessMessage('Notification has been updated successfully!');
          },
          error: (err) => console.error('Error updating notification', err)
        });
      } else {
        this.notificationService.add(this.notificationForm.value).subscribe({
          next: () => {
            this.displaySuccessMessage('Notification has been added successfully!');
          },
          error: (err) => console.error('Error adding notification', err)
        });
      }
    }
  }

  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/notification/list']);
    }, 2000);
  }

  onDelete(): void {
    const id = this.notificationForm.get('id')?.value;
    if (id) {
      this.notificationService.delete(id).subscribe({
        next: () => {
          this.displaySuccessMessage('Notification deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting notification', err);
          this.successMessage = '';
        }
      });
    }
  }
  navigateBackToNotifications(): void {
    this.router.navigate(['/notification/list']); 
  }
}
