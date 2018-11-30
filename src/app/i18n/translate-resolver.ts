import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TranslateService } from './translate.service';
import { TranslateToken } from '../i18n/translate-token';

@Injectable()
export class TranslateResolver implements Resolve<Observable<Object>> {
  constructor(
    private translate: TranslateService,
    @Inject(TranslateToken) private translateToken: string,
  ) {
  }

  resolve() {
    return this.translate.load(this.translateToken).pipe(
    map(() => null));
  }
}
