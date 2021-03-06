import {
  Inject,
  Injectable,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin as observableForkJoin, of as observableOf } from 'rxjs';
import {map} from 'rxjs/operators';
import merge from 'lodash-es/merge';

import { I18nLangService } from './i18n-lang.service';

export class ActiveI18n {
  store: string[] = [];

  add(token: string) {
    if (~this.store.indexOf(token)) {
      return;
    }
    this.store.push(token);
  }

  remove(token: string) {
    const index = this.store.indexOf(token);
    if (index > -1) {
      this.store.splice(index, 1);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  /** 在切换语言，并且i18n文件加载完成后，会触发`onLangChange`事件 */
  onLangChange = new EventEmitter();

  /** 国际化文本存储位置 */
  store = {};

  /** 记录对应的i18n文件是否被加载过 */
  loadedI18n = {};

  /** 储存国际化替换键值对 */
  meta: {[key: string]: string};

  /** 当前视图中正在生效的i18n文件，记录这个信息的目的是，当切换语言时，加载对应的i18n文件 */
  activeI18n = new ActiveI18n();
  prefix = './assets/i18n/';
  lang: string;

  constructor(
    private http: HttpClient,
    private i18nLang: I18nLangService,
  ) {
    // 因为TranslateService是单例运行，所以不需要对`i18nLang.current`做清理工作
    i18nLang.current.subscribe((lang) => {
      this.use(lang);
    });
  }

  merge(lang: string, json: Object) {
    this.store[lang] = this.store[lang] || {};
    merge(this.store[lang], json);
  }

  /**
   * 载入当前语言的片段i18n文件
   * @param token string 文件标记
   */
  load(token): Observable<Object> {
    // 检查i18n文件是否被加载过
    try {
      const loaded = this.loadedI18n[this.lang][token];
      if (loaded) {
        this.activeI18n.add(token);
        return observableOf(this.store);
      }
    } catch (e) {
      // noop
    }
    return observableForkJoin([
      this.fetchI18nFile(token),
      this.getMeta(),
    ])
    .pipe(
      map(([data]) => {
        this.loadedI18n[this.lang] = this.loadedI18n[this.lang] || {};
        this.loadedI18n[this.lang][token] = true;
        this.activeI18n.add(token);
        this.merge(this.lang, data);
        return this.store;
      }),
    );
  }

  getMeta() {
    if (this.meta) {
      return observableOf(this.meta);
    }
    return this.fetchI18nFile('meta').pipe(
      map((data) => {
        this.meta = data as any;
        return this.meta;
      }),
    );
  }

  fetchI18nFile(token) {
    return this.http.get(`${this.prefix}${this.lang}/${token}.json`);
  }

  /**
   * 改变当前语言
   * @param lang
   */
  use(lang) {
    this.lang = lang;
    observableForkJoin(this.activeI18n.store.map((token: string) => this.load(token)))
    .subscribe(() => {
      this.onLangChange.emit(this);
    });
  }

  /**
   * 翻译字段
   * @param _key
   */
  translateKey(_key) {
    if (!_key) {
      return '';
    }
    const key = _key.toString();
    if (!this.lang || !this.store[this.lang]) {
      return key;
    }
    const store = this.store[this.lang];
    const keyArr = key.split('.');
    let value = store;
    try {
      keyArr.forEach((k) => {
        value = value[k];
      });
      if (typeof value === 'string') {
        return this.fillInMeta(value);
      } else {
        return key;
      }
    } catch (err) {
      return key;
    }
  }

  fillInMeta(translateValue: string) {
    const metaholderReg = /(\${.+?})/;
    let result;
    while (result = translateValue.match(metaholderReg)) {
      const holder = result[1];
      const key = holder.slice(2, -1);
      translateValue = translateValue.replace(holder, this.meta[key]);
    }
    return translateValue;
  }

}
