import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from 'src/app/components/event-form/event-form.component';
import { EventListComponent } from 'src/app/components/event-list/event-list.component';

const routes: Routes = [
  {path: 'all-events', component:EventListComponent},
  {path: 'create', component:EventFormComponent},
  {path:'edit/:id', component:EventFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
