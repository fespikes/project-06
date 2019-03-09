import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitModalComponent } from './visit-modal.component';

describe('VisitModalComponent', () => {
  let component: VisitModalComponent;
  let fixture: ComponentFixture<VisitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
