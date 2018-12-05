import { TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';

import { I18nLangService } from './i18n-lang.service';
import { ApiService } from '../shared';

class ApiServiceStub {
  post() {
    return observableOf({});
  }
}

describe('I18nLangService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      I18nLangService,
      {
        provide: ApiService,
        useClass: ApiServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: I18nLangService = TestBed.get(I18nLangService);
    expect(service).toBeTruthy();
  });
});
