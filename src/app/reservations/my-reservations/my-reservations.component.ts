import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from "../reservation.service";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  private reservations = [];

  constructor(private reservationService:ReservationService, private router: Router) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe(next => {
      this.reservations = next;
    })
  }

  cancel(id) {
    this.reservationService.cancelReservation(id).subscribe(data => {
      if (data) {
        let reservationToDelete = this.reservations.find(reservation => reservation.id === id);
        reservationToDelete.state = 'fail';
      }
    })
  }

  makeReservation() {
    this.router.navigate(['/reservation/new']);
  }

}
