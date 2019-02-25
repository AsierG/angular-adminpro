import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadStorage();
    console.log('UserService ready');
  }

  isLoged() {
    return ( this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token}).pipe(
                  map( (resp: any) => {
                    this.saveStorage(resp.id, resp.token, resp.usuario);
                    return true;
                  }));
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(user: User, rememberme: boolean = false) {

    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post(url, user).pipe(
      map( (resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  createUser( user: User) {
    const url = URL_SERVICES + '/usuario';
    return this.http.post(url, user).pipe(
              map( (resp: any) => {
                swal('User created', user.email, 'success');
                return resp.usuario;
              }));
  }

  updateUser( user: User) {
    let url = URL_SERVICES + '/usuario/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user).pipe(
      map( (resp: any) => {
         const userDB: User = resp.usuario;
         this.saveStorage(userDB._id, this.token, userDB);
         swal('User updated', user.nombre, 'success');
         return true;
      }));
  }

  changeImage( file: File, id: string ) {

    this._uploadFileService.uploadFile(file, 'usuarios', id)
          .then( (resp: any) => {
            this.user.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.user.nombre, 'success' );
            this.saveStorage( id, this.token, this.user );
          })
          .catch( resp => {
            console.log( resp );
          }) ;
  }

  loadUsers( from: number = 0) {
    const url = URL_SERVICES + '/usuario?desde=' + from + '&token=' + this.token;
    return this.http.get(url);
  }

}
