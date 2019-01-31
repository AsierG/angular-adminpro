import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  areEquals(field1: string, field2: string) {
    return (group: FormGroup) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        areEquals: true
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, { validators: this.areEquals('password', 'password2')});

    this.registerForm.setValue({
      name: 'name',
      email: 'name@email.com',
      password: '123456',
      password2: '123456',
      conditions: true
    });

  }

  userRegister() {
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    if (!this.registerForm.value.conditions) {
      swal('Important', 'Yout must accept the conditions', 'warning');
      return;
    }

    const user = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    this._userService.createUser(user)
      .subscribe( resp => this.router.navigate(['/login']));

  }

}
