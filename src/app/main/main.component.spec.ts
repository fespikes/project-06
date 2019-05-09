import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from 'app/shared';
import { AuthServiceStub } from 'app/shared/services/auth.service.stub';
import { ApiService } from 'app/shared';
import { I18nModule, TranslateService, I18nLangService } from 'app/i18n';
import { TranslatePipeStub, DefaultPipeStub } from 'app/mock';

import { MainComponent } from './main.component';
import { TestModule } from 'app/shared/test.module';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        DefaultPipeStub,
        TranslatePipeStub,
      ],
      providers: [
        ApiService,
        {
          provide: AuthService,
          useClass: AuthServiceStub
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
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.user = {
      name: '',
      tenant: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
