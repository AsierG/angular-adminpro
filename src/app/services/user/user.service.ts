import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) {
    console.log('UserService ready');
  }

  createUser( user: User) {
    const url = URL_SERVICES + '/usuario';
    return this.http.post(url, user).pipe(
              map( (resp: any) => {
                swal('User created', user.email, 'success');
                return resp.usuario;
              }));
  }

}
