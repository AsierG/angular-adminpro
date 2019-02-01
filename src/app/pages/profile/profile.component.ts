import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    public _userService: UserService
  ) {
    this.user = _userService.user;
   }

  ngOnInit() {
  }

  save(user: User) {
    console.log(user);
    this.user.nombre = user.nombre;
    this.user.email = user.email;

    this._userService.updateUser(this.user)
              .subscribe( resp => {
                console.log(resp);
              });
  }

}
