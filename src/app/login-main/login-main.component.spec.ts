import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginMainComponent } from './login-main.component';
import { TranslatePipeSub } from 'app/mock';
import { AuthService } from 'app/shared';
import { I18nLangService } from 'app/i18n';

const payload = {
  tenant: 'demo',
  name: 'user',
  password: 'psd',
  username: 'uname',
}

describe('LoginMainComponent', () => {
  let component: LoginMainComponent;
  let fixture: ComponentFixture<LoginMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule],
      declarations: [ LoginMainComponent, TranslatePipeSub ],
      providers:[
        {
          provide: AuthService,
          useValue: {
            login(payload){
              return observableOf({});
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate() {}
          }
        },
        {
          provide: I18nLangService,
          useValue: {
            switchLang() {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
