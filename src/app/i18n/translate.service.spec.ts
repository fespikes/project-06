import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs';

import { TranslateService, I18nLangService } from '.';

class I18nLangServiceStub {
  current = observableOf('zh_CN');
}

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      TranslateService,
      {
        provide: HttpClient,
        useValue: {},
      },
      {
        provide: I18nLangService,
        useClass: I18nLangServiceStub,
      }
    ]
  }));

  it('should be created', () => {
    const service: TranslateService = TestBed.get(TranslateService);
    expect(service).toBeTruthy();
  });
});
