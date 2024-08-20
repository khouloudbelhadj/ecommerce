import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class OrderFormComponent implements OnInit {
  isEditMode = false;
  orderForm!: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      id: [0],
      reference: ['', Validators.required],
      dateOrder: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.orderService.get(id).subscribe({
          next: (order) => this.orderForm.patchValue(order),
          error: (err) => console.error('Error fetching order', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      if (this.isEditMode) {
        this.orderService.update(this.orderForm.value).subscribe({
          next: () => {
            this.displaySuccessMessage('Order updated successfully!');
            setTimeout(() => {
              this.router.navigate(['/order/list']);
            }, 2000);
          },
          error: (err) => console.error('Error updating order', err)
        });
      } else {
        this.orderService.add(this.orderForm.value).subscribe({
          next: () => {
            this.displaySuccessMessage('Order added successfully!');
            setTimeout(() => {
              this.router.navigate(['/order/list']);
            }, 2000);
          },
          error: (err) => console.error('Error adding order', err)
        });
      }
    }
  }

  onDelete(): void {
    const id = this.orderForm.get('id')?.value;
    if (id) {
      this.orderService.delete(id).subscribe({
        next: () => {
          this.displaySuccessMessage('Order deleted successfully!');
          setTimeout(() => {
            this.router.navigate(['/order/list']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error deleting order', err);
          this.successMessage = '';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/order/list']);
  }

  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }
}
