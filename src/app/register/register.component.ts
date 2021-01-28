import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from '../services/app-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private appService: AppServices,
    private router: Router) {
    document.title = 'Register';
    if (this.appService.isLoggedIn.value) {
      this.router.navigate(['/']);
    }
  }

  registratonForm = {
    email : '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  isPasswordSimilar = true;

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  handleInput(event) {
    this.registratonForm[event.target.name] = event.target.value;

    if (event.target.name === 'confirmPassword' && this.registratonForm.password !== event.target.value) {
      this.isPasswordSimilar = false
    } else {
      this.isPasswordSimilar = true
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.registratonForm.password !== this.registratonForm.confirmPassword) {
      this.isPasswordSimilar = false
      return;
    }
    this.appService.registerUser(this.registratonForm);
    this.router.navigate(['/favorites']);
  }

}
