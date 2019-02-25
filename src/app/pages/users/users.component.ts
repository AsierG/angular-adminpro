import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;

  totalRegisters: number = 0;

  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
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
    this._userService.loadUsers(this.from)
            .subscribe( (resp: any) => {
                console.log(resp);
                this.totalRegisters = resp.total;
                this.users = resp.usuarios;
            });
  }

}
