import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { MyReservationsComponent } from './reservations/my-reservations/my-reservations.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';

const routes:Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'reservations',
        component: MyReservationsComponent
      },
      {
        path: 'reservation/new',
        component: NewReservationComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
