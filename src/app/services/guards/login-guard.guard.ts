import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _userService: UserService,
               public router: Router) {

  }

  canActivate() {
    if (this._userService.isLoged() ) {
      console.log('guard, is loged');
      return true;
    } else {
      console.log('locked');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
