import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthModalComponent } from './truth-modal.component';

describe('TruthModalComponent', () => {
  let component: TruthModalComponent;
  let fixture: ComponentFixture<TruthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
