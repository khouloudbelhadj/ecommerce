import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
  imports: [CommonModule] 
})
export class UserLogoutComponent {
  message: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token'); // Remove token from local storage
        this.message = 'Successfully logged out';
        this.router.navigate(['/user/login']); 
      },
      (error) => {
        this.message = 'Logout failed';
        console.error(error); 
      }
    );
  }
}
