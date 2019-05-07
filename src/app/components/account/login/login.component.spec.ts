import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TestModule } from 'app/shared/test.module';
import { AccountService } from '../account.service';
import { AccountServiceStub } from '../account.service.stub';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: AccountService,
          useClass: AccountServiceStub
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
