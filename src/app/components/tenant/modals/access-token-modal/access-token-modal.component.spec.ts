import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenModalComponent } from './access-token-modal.component';
import { TestModule } from 'app/shared/test.module';
import { TenantService } from '../../tenant.service';

describe('AccessTokenModalComponent', () => {
  let component: AccessTokenModalComponent;
  let fixture: ComponentFixture<AccessTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ AccessTokenModalComponent ],
      providers: [
        {
          provide: TenantService,
          useValue: {
            fetchAccessToken(a?, b?) {
              return {
                subscribe(cb) {
                  cb({
                    body: []
                  })
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenModalComponent);
    component = fixture.componentInstance;
    component.oAuthClient = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
