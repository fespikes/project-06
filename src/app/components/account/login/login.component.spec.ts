import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { TuiMessageService } from 'tdc-ui';
import { I18nModule, TranslateService, I18nLangService } from 'app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeStub, DefaultPipeStub } from 'app/mock';

import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import {
  ApiService,
} from 'app/shared/services';
import { AuthServiceStub } from 'app/shared/services/auth.service.stub';

import { TestModule } from 'app/shared/test.module';

import { AccountService } from '../account.service';
import { AccountServiceStub } from '../account.service.stub';

import { LoginComponent } from './login.component';

class I18nLangServiceStub {
  current = of('zh_CN');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        OverlayModule,
        RouterTestingModule
        // TestModule
      ],
      declarations: [
        DefaultPipeStub,
        TranslatePipeStub,
        LoginComponent
      ],
      providers: [
        ApiService,
        TuiMessageService,
        {
          provide: I18nLangService,
          useClass: I18nLangServiceStub,
        },
        {
          provide: TranslateService,
          useValue: {
            get() {
              return of();
            },
            translateKey() {},
            onLangChange: {
              subscribe: () => {}
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.captchaUrl = '';
    component.roles = {
      federation: 'FEDERATION'
    };
    component.role = '';
    component.languages = [
      { value: 'zh_CN', name: '中文' },
      { value: 'en_US', name: 'English' },
    ];
    component.loginForm;
    component.errorMsg = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
