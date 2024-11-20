import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { UserDashboardComponent } from 'src/app/components/user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EventsModule } from '../events/events.module';
import { UtilitiesModule } from '../utilities/utilities.module';

const routes: Routes = [
  {path:':id', component:UserDashboardComponent},
];

@NgModule({
  declarations: [UserCardComponent,UserDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EventsModule,
    UtilitiesModule
  ],
  exports:[UserCardComponent,UserDashboardComponent]
})
export class UsersModule { }
