import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  I18nLangService,
  TranslateService,
} from './i18n';

import { ApiService, SharedModule }  from 'app/shared';
import { TestModule } from 'app/shared/test.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TestModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        AppService,
        {
          provide: I18nLangService,
          useValue: {
            switch(){}
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
