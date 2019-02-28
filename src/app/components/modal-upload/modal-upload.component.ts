import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadFile: File;
  tempFile: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService) {
    console.log('modal ready');
  }

  ngOnInit() {
  }

  closeModal() {
    this.tempFile = null;
    this.uploadImage = null;

    this._modalUploadService.hideModal();
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

  uploadImage() {
    this._uploadFileService.uploadFile(
      this.uploadFile, this._modalUploadService.type, this._modalUploadService.id)
      .then(resp => {
        console.log(resp);
        this._modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.log('Error uploading ...');
      });
  }



}
