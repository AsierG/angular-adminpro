import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {

    let url = URL_SERVICES + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'user':
         url += '/usuarios/' + img;
         break;
      case 'medico':
         url += '/medicos/' + img;
         break;
      case 'hospital':
         url += '/hospitales/' + img;
         break;
      default:
        console.log('Type of image does not exist. usuario, medico, hospital');
        return url + '/usuarios/xxx';
    }

    return url;
  }

}
