import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ReservationService {
  private url = 'http://localhost';

  private currentReservations = [];
  private reservationSubject = new BehaviorSubject(this.currentReservations);

  private locations = [];
  private locationsSubject = new BehaviorSubject(this.locations);

  private services = [];
  private serviceSubject = new BehaviorSubject(this.services);

  private times = [];
  private timeSubject = new BehaviorSubject(this.times);

  private time = '';

  constructor(private http:Http) {
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    return headers;
  }

  getReservations() {
    this.http.get(this.url + '/reservations', {headers: this.getHeaders()}).subscribe(next => {
      this.currentReservations = next.json();

      this.reservationSubject.next(this.currentReservations);
    })

    return this.reservationSubject;
  }

  addReservation(reservation) {
    let data = 'location_id=' + reservation.local + '&service_id=' + reservation.service +
    '&date=' + reservation.date + '&time_start=' + reservation.start; 
    return this.http.post(this.url + '/reservations', data, {headers: this.getHeaders()}).map(res => res.json());
  }

  cancelReservation(reservation) {
    let data = 'id=' + reservation;
    return this.http.post(this.url + '/cancel', data, {headers: this.getHeaders()}).map(res => res.json());
  }

  getLocations() {
    this.http.get(this.url + '/locations', {headers: this.getHeaders()}).subscribe(next => {
      this.locations = next.json();

      this.locationsSubject.next(this.locations);
    })

    return this.locationsSubject;
  }

  getServices(locationId) {

    this.http.get(this.url + '/services?location_id='+locationId).subscribe(next => {
      this.services = next.json();

      this.serviceSubject.next(this.services);
    })

    return this.serviceSubject;
  }

  getTimes(location, date) {
    this.http.get(this.url + '/reservations?location_id=' + location + '&date=' + date, {headers: this.getHeaders()}).subscribe(next => {
      let reservations = next.json();
      
      reservations.forEach(element => {
        this.times.push({
          id: element.id,
          start: element.time_start,
          end: element.time_end
        })
      });

      this.timeSubject.next(this.times);
    })

    return this.timeSubject;
  }

}
