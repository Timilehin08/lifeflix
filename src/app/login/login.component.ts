import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from '../services/app-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: '',
    password: ''
  }

  isInvalid = false;

  constructor(private appService: AppServices,
    private router: Router) {
    document.title = 'Login';
    if(this.appService.isLoggedIn.value) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  handleInput(event) {
    this.loginForm[event.target.name] = event.target.value;
    this.isInvalid = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    const validate = this.appService.loginUser(this.loginForm);
    if(!validate) {
      this.isInvalid = true;
      return;
    }
    this.router.navigate(['/favorites']);
  }

}
