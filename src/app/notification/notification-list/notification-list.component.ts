import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.getAll().subscribe((data: any) => {
      this.notifications = data;
    });
  }

  onUpdate(notification: Notification): void {
    this.router.navigate(['/notification/form', notification.id, 'edit']);
  }

  onDelete(notification: Notification): void {
    this.notificationService.delete(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      },
      error: (err) => console.error('Error deleting notification', err)
    });
  }

  navigateToAddNotification(): void {
    this.router.navigate(['/notification/form']);
  }
}
