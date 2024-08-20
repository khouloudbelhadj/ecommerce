import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { OrderLine } from '../models/orderLine.model';
import { Cart } from '../models/cart-page.model';
import { User } from '../models/user.model';  

@Injectable({
  providedIn: 'root'
})
export class CartPageService {
  private cartItemsSubject = new BehaviorSubject<OrderLine[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cart: Cart = {
    id: 0,
    user: {
      id: 0,
      code: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      mf: '',
      ville: '',
      role: [''],
      status: '',
      adress: {
        id: 0,
        street: '',
        houseNumber: '',
        zipCode: ''
      }
    },
    orderLines: new Set<OrderLine>()
  };

  constructor(private http: HttpClient) {}

  loadCartFromBackend(): void {
    this.http.get<Cart>('http://localhost:8080/cart/getOne/{userId}')
      .subscribe(cart => {
        this.cart = cart;
        this.cartItemsSubject.next(Array.from(cart.orderLines));
      });
  }

  addProductToCart(product: Product): void {
    const existingItem = Array.from(this.cart.orderLines).find((item) => (item as OrderLine).product.id === product.id);
    if (existingItem) {
      (existingItem as OrderLine).quantity += 1;
    } else {
      const newItem: OrderLine = {
        id: 0,
        product,
        quantity: 1,
        order: { id: 0 }
      };
      this.cart.orderLines.add(newItem);
    }
    this.cartItemsSubject.next(Array.from(this.cart.orderLines));
  }

  addProductToCartAndSave(product: Product) {
    this.addProductToCart(product);
    return this.http.post('http://localhost:8080/cart/add', this.cart);
  }

  removeItem(productId: number): void {
    this.cart.orderLines = new Set(Array.from(this.cart.orderLines).filter(item => (item as OrderLine).product.id !== productId));
    this.cartItemsSubject.next(Array.from(this.cart.orderLines));
    this.syncCartWithBackend();
  }

  syncCartWithBackend(): void {
    console.log('Cart to be sent:', this.cart);
    this.http.put('http://localhost:8080/cart/update', this.cart).subscribe(
      response => console.log('Cart updated successfully:', response),
      error => console.error('Error updating cart:', error)
    );
  }
}
