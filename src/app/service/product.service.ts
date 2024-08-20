import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}product/getAll`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}product/add`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}product/getOne/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}product/update`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}product/delete/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}category/getAll`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}product/getByCategory/${categoryId}`);
  }
}
