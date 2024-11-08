import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from 'src/app/components/event-form/event-form.component';

const routes: Routes = [
  { path: 'create', component:EventFormComponent},
  { path: 'edit', component:EventFormComponent},
  {path:'', redirectTo:'create',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
