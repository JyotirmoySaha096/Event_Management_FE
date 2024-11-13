import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerDashboardComponent } from 'src/app/components/organizer-dashboard/organizer-dashboard.component';
import { EventsModule } from '../events/events.module';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { OrganizerCardComponent } from 'src/app/components/organizer-card/organizer-card.component';
import { UtilitiesModule } from '../utilities/utilities.module';

const routes: Routes = [
  {path:':id', component:OrganizerDashboardComponent},
  // {path: '', redirectTo:"1", pathMatch:"full"}
];

@NgModule({
  declarations: [OrganizerDashboardComponent,OrganizerCardComponent],
  imports: [
    CommonModule,
    EventsModule,
    RouterModule.forChild(routes),
    UtilitiesModule
  ]
})
export class OrganizersModule { }
