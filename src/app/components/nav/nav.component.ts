import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  id: string | null = null;
  loggedIn!:boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router:Router) {
    this.authService.loggedInState.subscribe(val=>this.loggedIn=val.isLoggedIn);
  }
  // handleLogin(){
  //   // this.authService.isLoggedIn.next(!this.loggedIn);
    
  // }
  handleLogout(){
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
