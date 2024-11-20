import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css']
})
export class PermissionsPageComponent {
  count: number = 10;
  intervalId!: any;
  constructor(private router: Router) {}
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count--;
      if (this.count <= 0) {
        let token = localStorage.getItem('authToken');
        if(!token){
          this.router.navigate(['/login']);
        }else{
          this.router.navigate(['/user',token]);
        }
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
