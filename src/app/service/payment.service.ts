import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model'; 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl: string = 'http://localhost:8080/payment/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}getAll`);
  }

  add(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}add`, payment);
  }

  get(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}getOne/${id}`);
  }

  update(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}update`, payment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }
}
