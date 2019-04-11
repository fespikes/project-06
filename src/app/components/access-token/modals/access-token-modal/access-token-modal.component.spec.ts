import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenModalComponent } from './access-token-modal.component';

describe('AccessTokenModalComponent', () => {
  let component: AccessTokenModalComponent;
  let fixture: ComponentFixture<AccessTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTokenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
