import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'ProgressBar', url: '/progress'},
        {title: 'Graphics', url: '/graphics1'},
        {title: 'Promises', url: '/promises'},
        {title: 'RxJs', url: '/rxjs'}
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Users', url: '/users'},
        {title: 'Hospitals', url: '/hospitals'},
        {title: 'Doctors', url: '/doctor'}
      ]
    }
  ];

  constructor() { }
}
