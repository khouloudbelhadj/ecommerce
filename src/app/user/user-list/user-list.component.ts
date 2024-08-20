import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service'; 
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
    }, error => {
      console.error('Erreur lors du chargement des utilisateurs', error);
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      }, error => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      });
    }
  }
}
