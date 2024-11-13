import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventsModule } from './modules/events/events.module';

const routes: Routes = [
  { path: 'event', loadChildren: ()=>import('./modules/events/events.module').then(m=>m.EventsModule) },
  // { path: 'event-form/:id', loadChildren: ()=>import('./modules/events/events.module').then(m=>m.EventsModule) },
  { path: 'organizer', loadChildren: ()=>import('./modules/organizers/organizers.module').then(m=>m.OrganizersModule) },
  { path: 'user', loadChildren: ()=>import('./modules/users/users.module').then(m=>m.UsersModule) },
  { path: 'register', loadChildren: ()=>import('./modules/registration/registration.module').then(m=>m.RegistrationModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
