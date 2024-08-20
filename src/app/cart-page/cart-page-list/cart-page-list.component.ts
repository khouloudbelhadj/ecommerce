import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartPageService } from '../../service/cart-page.service';  
import { OrderLine } from '../../models/orderLine.model';    
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-page-list.component.html',
  styleUrls: ['./cart-page-list.component.css']
})
export class CartPageListComponent implements OnInit {
  cartItems: OrderLine[] = [];
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(public router: Router, private cartPageService: CartPageService) {}

  ngOnInit(): void {
    this.cartPageService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartPageService.loadCartFromBackend();  // Load cart data from backend
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeItem(item: OrderLine): void {
    this.cartPageService.removeItem(item.product.id);
  }

  updateCart(): void {
    this.cartPageService.syncCartWithBackend();
  }

  placeOrder(): void {
    this.router.navigate(['/payment/form']);  
  }

  goBackToProducts(): void {
    this.router.navigate(['/product/list']);
  }

  increaseQuantity(item: OrderLine): void {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: OrderLine): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }
}
