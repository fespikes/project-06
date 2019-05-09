import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AccessTokenComponent } from './access-token.component';
import { AccessTokenService } from './access-token.service';
import { AccessTokenServiceStub } from './access-token.service.stub';
import { ApiService } from 'app/shared';
import { TestModule } from 'app/shared/test.module';
import { ModalsService } from './modals/modals.service'
import { TuiModalService} from 'tdc-ui';
import { TuiModalServiceStub } from 'app/shared/test.module';
import { I18nModule, TranslateService, I18nLangService } from 'app/i18n';

describe('AccessTokenComponent', () => {
  let component: AccessTokenComponent;
  let fixture: ComponentFixture<AccessTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        AccessTokenComponent
      ],
      providers: [
        ModalsService,
        {
          provide: AccessTokenService,
          useClass: AccessTokenServiceStub
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
    fixture = TestBed.createComponent(AccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
