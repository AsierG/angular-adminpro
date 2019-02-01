import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  constructor(public router: Router,
              public _userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);

    this._userService.login(user, form.value.rememberme)
                  .subscribe(resp => this.router.navigate(['/dashboard']));

    console.log(form.valid);
    console.log(form.value);
    // this.router.navigate(['dashboard']);
  }

}
