import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ApiService } from '../shared'

export const LANG_KEY = 'rubik_language';

export enum Language {
  zh_CN = 1,
  en_US
}

const BCP47Mapping = {
  en_US: 'en-US',
  zh_CN: 'zh-CN',
}

@Injectable({
  providedIn: 'root'
})
export class I18nLangService {

  private langId: Language;
  private currentLangSubject = new BehaviorSubject<string>(this.lang);
  current = this.currentLangSubject.asObservable().pipe(distinctUntilChanged());
  currentBCP47 = this.current.pipe(
    map((lang) => {
      return BCP47Mapping[lang];
    }),
  );

  constructor(
    private api: ApiService,
  ) { }

  set lang(lang: string) {
    this.langId = Language[lang];
    window.localStorage.setItem(LANG_KEY, lang);
    this.currentLangSubject.next(lang);
  }

  get lang() {
    if(!this.langId) {
      this.initLangId();
    }
    return Language[this.langId];
  }

  initLangId() {
    const lang = window.localStorage.getItem(LANG_KEY) || navigator.language;
    this.langId = Language[lang] || 1;
  }

  switch(lang: string) {
    if (!Language[lang]) {
      return;
    }
    this.lang = lang;
    this.api.post(`config/change-session-language/${lang}`);
  }
}
