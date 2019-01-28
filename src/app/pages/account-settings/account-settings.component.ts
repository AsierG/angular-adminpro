import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) { }

  ngOnInit() {
    this.putCheck();
  }

  colorChange(theme: string, link: any) {
    this.checkApply(link);
    this._settings.applyTheme(theme);
  }

  checkApply(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const tema = this._settings.settings.theme;
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
