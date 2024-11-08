import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventsModule } from './modules/events/events.module';

const routes: Routes = [
  { path: 'event-form', loadChildren: ()=>import('./modules/events/events.module').then(m=>m.EventsModule) },
  { path: 'event-form/:id', loadChildren: ()=>import('./modules/events/events.module').then(m=>m.EventsModule) },
  { path: '', redirectTo: '/event-form', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
