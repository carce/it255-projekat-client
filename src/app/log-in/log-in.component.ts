import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private login = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.logIn(this.login.value.username, this.login.value.password)
    .subscribe(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/reservations']);
      }
    })
  }

}
