import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from 'src/app/components/event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EventsRoutingModule } from './events-routing/events-routing.module';
import { EventListComponent } from 'src/app/components/event-list/event-list.component';
import { UtilitiesModule } from '../utilities/utilities.module';



@NgModule({
  declarations: [EventFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    UtilitiesModule
  ],
  exports:[EventFormComponent]
})
export class EventsModule { }
