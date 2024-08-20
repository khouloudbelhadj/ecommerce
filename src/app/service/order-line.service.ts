import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderLine } from '../models/orderLine.model'; 

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {
  private baseUrl: string = 'http://localhost:8080/orderLine/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.baseUrl}getAll`);
  }

  add(orderLine: OrderLine): Observable<OrderLine> {
    return this.http.post<OrderLine>(`${this.baseUrl}add`, orderLine);
  }

  get(id: number): Observable<OrderLine> {
    return this.http.get<OrderLine>(`${this.baseUrl}getOne/${id}`);
  }

  update(orderLine: OrderLine): Observable<OrderLine> {
    return this.http.put<OrderLine>(`${this.baseUrl}update`, orderLine);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}delete/${id}`);
  }
}
