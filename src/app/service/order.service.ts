import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model'; 
import { Cart } from '../models/cart-page.model'; 


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = 'http://localhost:8080/order/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}getAll`);
  }

  add(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}add`, order);
  }

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}getOne/${id}`);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}update`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }

  createFromCart(cart: Cart): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}createFromCart`, cart);
  }
}
