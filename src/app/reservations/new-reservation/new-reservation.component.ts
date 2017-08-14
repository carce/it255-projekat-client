import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  private timeForm = new FormGroup({
    hour: new FormControl(),
    minut: new FormControl()
  })

  private myReservation = {
    local: 0,
    service: 0,
    date: '',
    start: '',
    end: ''
  };

  private date = new Date();
  private dates = [];

  private locations = [];
  private services = [];
  private times = [];
  private allFree = false;
  private duration;

  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit() {
    this.reservationService.getLocations().subscribe(next => {
      this.locations = next;
    })

    for (let i = 0; i < 20; i++) {
      this.date.setDate(this.date.getDate() + 1);
      let day = this.date.toISOString().substring(0, this.date.toISOString().indexOf('T'));
      this.dates.push(day);
    }
  }

  addLocal(id) {
    this.reservationService.getServices(id).subscribe(next => {
      this.services = next;
    })
    this.myReservation.local = id;
  }

  addService(id) {
    this.myReservation.service = id;
    let s = this.services.find(service => service.id == id);
    this.duration = s.duration;
    console.log(s);
    console.log(s.duration, this.duration);
  }

  addDate(date) {
    this.reservationService.getTimes(this.myReservation.local, date).subscribe(next => {
      this.times = next;

      if (this.times.length == 0) 
        this.allFree = true;
    })
    this.myReservation.date = date;
  }

  addTime() {
    this.myReservation.start = this.timeForm.value.hour + ':' + this.timeForm.value.minut + ':00'; 
    let endTime = new Date('1970-1-1 ' + this.myReservation.start);
    console.log(endTime.getTime(), this.duration, this.duration * 60000);
    let finalTime = new Date(endTime.getTime() + this.duration * 60000);
    console.log(endTime, finalTime);
  }

  makeReservation() {
    this.reservationService.addReservation(this.myReservation).subscribe(data => {
      if (data) {
        this.router.navigate(['/reservations']);
      }
    })
  }

}
