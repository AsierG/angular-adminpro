import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  auth2: any;

  constructor(public router: Router,
              public _userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '1075259464912-kn3hgfjr1ltlifft9cs05dk7knlt1k8n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);

      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this._userService.loginGoogle(token)
              .subscribe( (resp: any) => window.location.href = '#/dashboard');
    });
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
