import { Component } from '@angular/core';
import { I18nLangService } from './i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = "Guardian Federation";

  constructor(
    private i18nLang: I18nLangService,
  ) {
    i18nLang.switch(i18nLang.lang);
  }
}
