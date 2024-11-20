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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true),
  });
  authTokenSubscription!: Subscription;
  userServiceSubscription!: Subscription;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      try {
        this.authTokenSubscription = this.authService
          .login(this.form.value as LoginCredentials)
          .subscribe((x) => {
            if (x == 0) {
              this.authService.loggedInState.next({
                isLoggedIn: false,
                authToken: null,
              });
              this.alertMessage =
                'Invalid Credentials. Please check your email and password.';
              this.alertClass = 'alert-danger';
              setTimeout(() => {
                this.alertMessage = '';
              }, 3000);
            } else {
              const userId = `${x}`;
              if (userId) {
                this.userServiceSubscription = this.userService
                  .getUserById(userId)
                  .subscribe((userData) => {
                    this.authService.loggedInState.next({
                      isLoggedIn: true,
                      authToken: `${x}`,
                    });
                    if (this.form.value.rememberMe) {
                      localStorage.setItem('authToken', userId);
                    }
                    if (userData.role.roleName == 'Admin')
                      this.router.navigate([`/admin/${userId}`]);
                    else if (userData.role.roleName == 'User')
                      this.router.navigate([`/user/${userId}`]);
                    else if (userData.role.roleName == 'Organizer')
                      this.router.navigate([`/organizer/${userId}`]);
                  });
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
  ngOnDestroy() {
    this.authTokenSubscription?.unsubscribe();
    this.userServiceSubscription?.unsubscribe();
  }
}
