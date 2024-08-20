import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adress } from '../models/adress.model'; 

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  private baseUrl: string = 'http://localhost:8080/adress/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Adress[]> {
    return this.http.get<Adress[]>(`${this.baseUrl}getAll`);
  }

  add(adress: Adress): Observable<Adress> {
    return this.http.post<Adress>(`${this.baseUrl}add`, adress);
  }

  get(id: number): Observable<Adress> {
    return this.http.get<Adress>(`${this.baseUrl}getOne/${id}`);
  }

  update(adress: Adress): Observable<Adress> {
    return this.http.put<Adress>(`${this.baseUrl}update`, adress);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }
}
