import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../service/payment.service'; 
import { Payment } from '../../models/payment.model';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; // Import Router

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.paymentService.getAll().subscribe((data: Payment[]) => {
      this.payments = data;
    }, error => {
      console.error('Erreur lors du chargement des paiements', error);
    });
  }

  navigateToAddPayment(): void {
    this.router.navigate(['/payment/form']);
  }

}
