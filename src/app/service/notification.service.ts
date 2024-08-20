// notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model'; 

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: string = 'http://localhost:8080/notification/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}getAll`);
  }

  add(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}add`, notification);
  }

  get(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}getOne/${id}`);
  }

  update(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}update`, notification);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }
  
}
