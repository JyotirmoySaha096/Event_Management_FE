import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from 'src/app/components/registration-form/registration-form.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  // {path:'create', component:RegistrationFormComponent},
  // {path: 'edit/:id', component:RegistrationFormComponent},
  {path:'', component:RegistrationFormComponent, pathMatch:"full"},
  {path:':id', component:RegistrationFormComponent,}
]

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[RegistrationFormComponent]
})
export class RegistrationFormModule { }
