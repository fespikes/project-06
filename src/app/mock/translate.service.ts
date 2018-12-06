import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export class TranslateServiceMock {
  onLangChange = new EventEmitter();
  use() {}
  translateKey() {}
}