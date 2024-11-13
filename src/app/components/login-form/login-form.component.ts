import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // email control with validation
    password: new FormControl('', [Validators.required]), // password control with validation
    rememberMe: new FormControl(false), // rememberMe control (checkbox)
  });
  authTokenSubscription!: Subscription;
  userServiceSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      try {
        this.authTokenSubscription=this.authService.login(this.form.value as LoginCredentials).subscribe((x) => {
          if (x == 0) {
            this.authService.loggedInState.next({ isLoggedIn: false, authToken:null });
            console.log("No users found");
          } else {
            console.log(x);
            const userId = `${x}`;
            if (userId) {
              this.userServiceSubscription = this.userService
                .getUserById(userId)
                .subscribe((userData) => {
                this.authService.loggedInState.next({ isLoggedIn: true, authToken:`${x}` });
                localStorage.setItem('authToken',userId);
                console.log(userData)
                  if (userData.role.roleName == "Admin") return;
                  else if (userData.role.roleName == "User")
                    this.router.navigate([`/user/${userId}`]);
                  else if (userData.role.roleName == "Organizer")
                    this.router.navigate([`/organizer/${userId}`]);
                });
            }
          }
        });;
      } catch (e) {
        console.log(e);
      }

      // this.authTokenSubscription = this.authService.loggedInState.subscribe(
      //   (state) => {
      //     if (state.isLoggedIn) {
            
      //     } else {
      //       console.log('No users found');
      //     }
      //   }
      // );
    }
  }
  ngOnDestroy() {
    this.authTokenSubscription?.unsubscribe();
    this.userServiceSubscription?.unsubscribe();
  }
}
