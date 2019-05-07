import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { TenantServiceStub } from '../tenant.service.stub';
import { TenantService } from '../tenant.service';
import { TestModule } from 'app/shared/test.module';
import { ModalsService } from '../modals.service';
import { ModalsServiceStub } from '../modals.service.stub';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ ListComponent ],
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
