import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventsModule } from './modules/events/events.module';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'event',
    loadChildren: () =>
      import('./modules/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'organizer',
    loadChildren: () =>
      import('./modules/organizers/organizers.module').then(
        (m) => m.OrganizersModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./modules/registration-form/registration-form.module').then(
        (m) => m.RegistrationFormModule
      ),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./modules/registration-form/registration-form.module').then(
        (m) => m.RegistrationFormModule
      ),
  },
  {
    path: 'permission-denied',
    loadChildren: () =>
      import('./modules/organizer-permission/organizer-permission.module').then(
        (m) => m.OrganizerPermissionModule
      ),
  },
  {path:'participants',loadChildren:()=>import('./modules/participants/participants.module').then(m=>m.ParticipantsModule)},
  { path: '', component:HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
