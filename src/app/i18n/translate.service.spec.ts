
import {of as observableOf} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { TranslateService, I18nLangService } from '.';
class I18nLangServiceStub {
  current = observableOf('zh_CN');
}

describe('TranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        {
          provide: HttpClient,
          useValue: {},
        },
        {
          provide: I18nLangService,
          useClass: I18nLangServiceStub,
        },
      ],
    });
  });

  it('should be created', inject([TranslateService], (service: TranslateService) => {
    expect(service).toBeTruthy();
  }));
});
