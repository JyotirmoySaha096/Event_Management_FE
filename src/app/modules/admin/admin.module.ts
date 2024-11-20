import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerDashboardComponent } from 'src/app/components/organizer-dashboard/organizer-dashboard.component';
import { OrganizerCardComponent } from 'src/app/components/organizer-card/organizer-card.component';
import { EventsModule } from '../events/events.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { OrganizersModule } from '../organizers/organizers.module';
import { ManageOrganizerTableComponent } from 'src/app/components/manage-organizer-table/manage-organizer-table.component';

const routes: Routes = [
  {path:':id', component:OrganizerDashboardComponent},
  // {path: '', redirectTo: localStorage.getItem('authToken')||'0', pathMatch:"full"}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventsModule,
    RouterModule.forChild(routes),
    UtilitiesModule,
    OrganizersModule
  ]
})
export class AdminModule { }
