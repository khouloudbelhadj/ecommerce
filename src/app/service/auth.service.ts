import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login.model';
import { LoginResponseDTO } from '../models/login-response.model';
import { LogoutResponseDTO } from '../models/logout-response.model';
import { RegistrationDTO } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/auth/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(credentials: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}login`, credentials, {
      headers: this.headers,
      withCredentials: true
    });
  }

  logout(): Observable<LogoutResponseDTO> {
    return this.http.post<LogoutResponseDTO>(`${this.baseUrl}logout`, {}, {
      headers: this.headers,
      withCredentials: true
    });
  }

  register(user: RegistrationDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}register`, user, {
      headers: this.headers,
      withCredentials: true
    });
  }

  affiliateRegister(id: string, user: RegistrationDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}register/${id}`, user, {
      headers: this.headers,
      withCredentials: true
    });
  }

  checkToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}check-token`, {
      headers: this.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}
