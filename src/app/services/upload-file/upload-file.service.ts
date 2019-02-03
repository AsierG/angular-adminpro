import { Injectable } from '@angular/core';
import { reject } from 'q';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: string) {

    return new Promise( (resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', file, file.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('file uploaded');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('failed the upload');
            reject(xhr.response);
          }
        }
      };

      console.log('file uploaded');

      const url = URL_SERVICES + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });



  }

}
