import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/users/users.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    // EventsModule,
    UsersModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
