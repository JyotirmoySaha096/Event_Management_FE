import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { SignupFormComponent } from 'src/app/components/signup-form/signup-form.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ParticipateFormComponent } from 'src/app/components/participate-form/participate-form.component';
// import { UtilitiesModule } from '../utilities/utilities.module';

const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  {path: 'signup', component:SignupFormComponent},
  {path: 'participate', component:ParticipateFormComponent},
  {path:'', redirectTo:'login', pathMatch:"full"}
];

@NgModule({
  declarations: [LoginFormComponent,SignupFormComponent,ParticipateFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // UtilitiesModule
  ],
  exports:[LoginFormComponent,SignupFormComponent,ParticipateFormComponent]
})
export class RegistrationModule { }
