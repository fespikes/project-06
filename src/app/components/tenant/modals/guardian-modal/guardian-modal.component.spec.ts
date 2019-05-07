import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianModalComponent } from './guardian-modal.component';
import { TestModule } from 'app/shared/test.module';

describe('GuardianModalComponent', () => {
  let component: GuardianModalComponent;
  let fixture: ComponentFixture<GuardianModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ GuardianModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
