import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { UserDashboardComponent } from 'src/app/components/user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EventsModule } from '../events/events.module';

const routes: Routes = [
  {path:':id', component:UserDashboardComponent},
  // {path: '', redirectTo:"1", pathMatch:"full"}
];

@NgModule({
  declarations: [UserCardComponent,UserDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EventsModule
  ],
  exports:[UserCardComponent,UserDashboardComponent]
})
export class UsersModule { }
