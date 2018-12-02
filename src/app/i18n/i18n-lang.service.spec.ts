import { TestBed } from '@angular/core/testing';

import { I18nLangService } from './i18n-lang.service';

describe('I18nLangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: I18nLangService = TestBed.get(I18nLangService);
    expect(service).toBeTruthy();
  });
});
