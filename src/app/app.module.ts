import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { OrganizersModule } from './modules/organizers/organizers.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    // LoginFormComponent,
    NavComponent,
    // UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RegistrationModule,
    // UsersModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
