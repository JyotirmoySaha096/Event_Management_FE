import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerDashboardComponent } from 'src/app/components/organizer-dashboard/organizer-dashboard.component';
import { EventsModule } from '../events/events.module';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { OrganizerCardComponent } from 'src/app/components/organizer-card/organizer-card.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ManageOrganizerTableComponent } from 'src/app/components/manage-organizer-table/manage-organizer-table.component';
import { ManageParticipantTableComponent } from 'src/app/components/manage-participant-table/manage-participant-table.component';

const routes: Routes = [
  { path: ':id', component: OrganizerDashboardComponent },
];

@NgModule({
  declarations: [
    OrganizerDashboardComponent,
    OrganizerCardComponent,
    ManageOrganizerTableComponent,
    ManageParticipantTableComponent
  ],
  imports: [
    CommonModule,
    EventsModule,
    RouterModule.forChild(routes),
    UtilitiesModule,
  ],
})
export class OrganizersModule {}
