import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantModalComponent } from './tenant-modal.component';
import { TestModule } from 'app/shared/test.module';

describe('TenantModalComponent', () => {
  let component: TenantModalComponent;
  let fixture: ComponentFixture<TenantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ TenantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
