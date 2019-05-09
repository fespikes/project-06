import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { ApiService } from 'app/shared';
import { TenantServiceStub } from '../tenant.service.stub';
import { TenantService } from '../tenant.service';
import { TestModule } from 'app/shared/test.module';
import { ModalsService } from '../modals.service';
import { ModalsServiceStub } from '../modals.service.stub';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ DetailsComponent ],
      providers: [
        {
          provide: TenantService,
          useClass: TenantServiceStub
        },
        {
          provide: ModalsService,
          useClass: ModalsServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
