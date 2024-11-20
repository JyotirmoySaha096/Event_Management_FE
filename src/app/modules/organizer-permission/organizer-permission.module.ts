import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsPageComponent } from 'src/app/components/permissions-page/permissions-page.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PermissionsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component:PermissionsPageComponent}])
  ]
})
export class OrganizerPermissionModule { }
