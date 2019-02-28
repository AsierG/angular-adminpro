import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { URL_SERVICES } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;

  totalRegisters: number = 0;
  loading: boolean = true;

  constructor(public _userService: UserService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();

    this._modalUploadService.notification
      .subscribe(() => this.loadUsers());
  }

  showModal(id: string) {
    console.log('show modal, userId: ' + id);
    this._modalUploadService.showModal('usuarios', id);
  }

  changeFrom( value: number ) {
    const from = this.from + value;
    console.log(from);

    if (from >= this.totalRegisters) {
      return;
    }
    if (from < 0) {
      return;
    }

    this.from += value;
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this._userService.loadUsers(this.from)
            .subscribe( (resp: any) => {
                this.totalRegisters = resp.total;
                this.users = resp.usuarios;
                this.loading = false;
            });
  }

  searchUser(term: string) {
    if ( term.length <= 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this._userService.searchUsers(term).
        subscribe( (users: User[]) => {
          this.users = users;
          this.loading = false;
          console.log(this.users);
        } );
  }

  deleteUser(user: User) {

    if ( user._id === this._userService.user._id) {
      swal('Can not delete user', 'He can not erase himself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user! User name: ' + user.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {

      console.log(willDelete + ' user._id ' + user._id + ' name ' + user.nombre);
      if (willDelete) {
        this._userService.deleteUser(user._id)
          .subscribe( deleted => {
            console.log(deleted);
            this.loadUsers();
        });

      }
    });

  }

  saveUser(user: User) {
    this._userService.updateUser(user)
      .subscribe();
  }

}
