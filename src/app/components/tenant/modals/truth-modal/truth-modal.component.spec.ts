import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthModalComponent } from './truth-modal.component';
import { TestModule } from 'app/shared/test.module';
import { TenantService } from '../../tenant.service';
import { TenantServiceStub } from '../../tenant.service.stub';

describe('TruthModalComponent', () => {
  let component: TruthModalComponent;
  let fixture: ComponentFixture<TruthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ TruthModalComponent ],
      providers: [
        {
          provide: TenantService,
          useClass: TenantServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruthModalComponent);
    component = fixture.componentInstance;
    (component as any).data = {
      tenant: {}
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
