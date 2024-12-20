import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCred } from 'src/app/Models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // email control with validation
    name: new FormControl('', [Validators.required]), // email control with validation
    password: new FormControl('', [Validators.required]), // password control with validation
  });
  alertMessage: string = '';
  alertClass: string = '';

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.userService
        .addUser(this.form.value as UserCred)
        .subscribe((user) => {
          if (user) this.router.navigate(['/register/login']);
          else {
            console.log('User already exists');
            this.alertMessage =
              'User already exists with this email. Please try with another email.';
            this.alertClass = 'alert-danger';
            setTimeout(() => {
              this.alertMessage = '';
            }, 3000);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
