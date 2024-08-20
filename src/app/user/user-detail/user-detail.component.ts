import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class UserDetailComponent implements OnInit {
  user: User;
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = {
      id: 0,
      code: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      mf: "",
      ville: "",
      role: [""],
      status: "",
      adress: { id: 0, street: "", houseNumber: "", zipCode: "" }
    };
  }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.get(userId).subscribe({
      next: (user: User) => {
        this.user = user ;
        console.log(user);
        console.log(this.user);
      } ,
      error: (err) => console.error('Failed to fetch user:', err)
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
