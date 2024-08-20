import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../service/payment.service';
import { Payment } from '../../models/payment.model';
import { PaymentStatus } from '../../models/payment-status.enum'; 
import { CartPageService } from '../../service/cart-page.service';
import { OrderLine } from '../../models/orderLine.model'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class PaymentFormComponent implements OnInit {
  isEditMode = false;
  paymentForm!: FormGroup;
  paymentStatuses = Object.values(PaymentStatus); 
  selectedStatus: string = '';
  cartItems: OrderLine[] = [];
  successMessage: string = ''; 
   
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private cartPageService: CartPageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      id: [0],
      reference: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      cardNumber: [''],
      expirationDate: [''],
      cvv: [''],
      paypalEmail: [''],
      paypalPassword: ['']
    });

    this.cartPageService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.paymentForm.get('amount')?.setValue(this.getCartTotal());
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.paymentService.get(id).subscribe({
          next: (payment) => this.paymentForm.patchValue(payment),
          error: (err) => console.error('Error fetching payment', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    
    if (this.selectedStatus !== 'Card') {
      this.paymentForm.get('cardNumber')?.reset();
      this.paymentForm.get('expirationDate')?.reset();
      this.paymentForm.get('cvv')?.reset();
    }
    
    if (this.selectedStatus !== 'PayPal') {
      this.paymentForm.get('paypalEmail')?.reset();
      this.paymentForm.get('paypalPassword')?.reset();
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.paymentService.update(this.paymentForm.value).subscribe({
        next: () => {
          this.successMessage = 'Payment has been updated successfully! Thank you for your trust.';
          setTimeout(() => this.router.navigate(['/product/list']), 3500);  
        },
        error: (err) => console.error('Error updating payment', err)
      });
    } else {
      this.paymentService.add(this.paymentForm.value).subscribe({
        next: () => {
          this.successMessage = 'Payment has been completed successfully! Thank you for your trust.';
          setTimeout(() => this.router.navigate(['/product/list']), 3500);  
        },
        error: (err) => console.error('Error adding payment', err)
      });
    }
  }

  onCancel(): void {
    this.paymentForm.reset();
    this.selectedStatus = ''; 
  }
  
  onBack(): void {
    this.router.navigate(['/cart-page/cart-page-list']); 
  }
}
