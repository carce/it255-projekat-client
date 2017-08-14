import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private url = 'http://localhost';  

  constructor(private http: Http) { }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  logIn(username, password) {
    let data = 'username=' + username + '&password=' + password;
    return this.http.post(this.url + '/auth', data, {headers: this.getHeaders()})
    .map(res => res.json());
  }
  
  register(email, username, password) {
    let data = 'email=' + email  + '&username=' + username + '&password=' + password;
    return this.http.post(this.url + '/register', data, {headers: this.getHeaders()})
    .map(res => res.json());
  }

}
