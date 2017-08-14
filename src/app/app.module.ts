import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from './reservations/reservation.service';
import { AuthService } from './shared/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { MyReservationsComponent } from './reservations/my-reservations/my-reservations.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LogInComponent,
    RegisterComponent,
    AppShellComponent,
    MyReservationsComponent,
    NewReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ReservationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
