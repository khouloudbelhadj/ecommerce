import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:8080/category/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}getAll`);
  }

  add(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}add`, category);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}getOne/${id}`);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}update`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }
}
