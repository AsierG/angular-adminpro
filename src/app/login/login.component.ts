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

  rememberme: boolean = false;

  constructor(public router: Router,
              public _userService: UserService) { }

  ngOnInit() {
    init_plugins();
  }

  logging(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);

    this._userService.login(user, form.value.rememberme)
                  .subscribe(resp => {
                      console.log(resp);
                  });

    console.log(form.valid);
    console.log(form.value);
    // this.router.navigate(['dashboard']);
  }

}
