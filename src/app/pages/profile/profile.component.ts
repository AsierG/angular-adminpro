import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadFile: File;
  tempFile: string;

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
    if (this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user)
              .subscribe();
  }

  imageSelection(file: File ) {

    if (!file ) {
      this.uploadFile = null;
      return;
    }

    if (file.type.indexOf('image') < 0 ) {
      swal('Only images', 'The selected file is not an image', 'error');
      this.uploadFile = null;
      return;
    }

    this.uploadFile = file;
    console.log('file ' + this.uploadFile);

    const reader = new FileReader();
    const urlTempImage = reader.readAsDataURL(file);
    console.log('urlTempImage ' + urlTempImage);

    reader.onloadend = () => this.tempFile = reader.result;

  }

  changeImage() {
    this._userService.changeImage( this.uploadFile, this.user._id );
  }

}
