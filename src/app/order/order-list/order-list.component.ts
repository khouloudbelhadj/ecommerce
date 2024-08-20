import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => console.error('Error fetching orders', err)
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.delete(id).subscribe({
        next: () => this.loadOrders(),
        error: (err) => console.error('Error deleting order', err)
      });
    }
  }
}
