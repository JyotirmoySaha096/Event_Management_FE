import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userToken: string = '';
  constructor(private router: Router) { 
    this.userToken = localStorage.getItem('authToken') || '';
  }
  navigateToLogin(): void {
    this.router.navigate(['/register/login']);
  }
}
