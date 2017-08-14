import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.register.value.email, this.register.value.username, this.register.value.password)
    .subscribe(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/reservations']);
      }
    })
  }

}
