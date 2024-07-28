import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dasshboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService, private router : Router) {}
  ngOnInit(): void {
    console.log("called DashBoard");
    
  }

  // For logout functionality
  logoutDashBoard(){
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }
  
}
