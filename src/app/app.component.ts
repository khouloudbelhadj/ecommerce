import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponentUser } from './navbar/navbar-user/navbar-user.component';
import { NavbarStandardComponent } from './navbar/navbar-standard/navbar-standard.component';
import { NavbarAdminComponent } from './navbar/navbar-admin/navbar-admin.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavbarComponentUser, SidebarComponent, FooterComponent,NavbarStandardComponent,NavbarAdminComponent],
  templateUrl: './app.component.html',
  styleUrls:[
    "/public/plugins/fontawesome-free/css/all.min.css",
    "/public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
    "/public/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
    "/public/plugins/jqvmap/jqvmap.min.css",
    "/public/dist/css/adminlte.min.css",
    "/public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
    "/public/plugins/daterangepicker/daterangepicker.css",
    "/public/plugins/summernote/summernote-bs4.min.css"
  ]
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
 // userRole: string = 'agent'; 
 //userRole: string = 'user'; 
  userRole: string = 'admin'; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  //  this.userRole = this.authService.getUserRole(); // Fetch the role from your AuthService or equivalent
  }
}
