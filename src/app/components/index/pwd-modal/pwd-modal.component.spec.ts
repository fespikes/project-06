import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdModalComponent } from './pwd-modal.component';
import { TestModule } from 'app/shared/test.module';

describe('PwdModalComponent', () => {
  let component: PwdModalComponent;
  let fixture: ComponentFixture<PwdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],

      declarations: [ PwdModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
