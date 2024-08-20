import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}getAll`);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}add`, user);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}getOne/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}update`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }
}
