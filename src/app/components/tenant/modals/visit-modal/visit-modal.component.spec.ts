import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitModalComponent } from './visit-modal.component';
import { TestModule } from 'app/shared/test.module';

describe('VisitModalComponent', () => {
  let component: VisitModalComponent;
  let fixture: ComponentFixture<VisitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ VisitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
