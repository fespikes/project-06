import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthModalComponent } from './oauth-modal.component';

describe('OauthModalComponent', () => {
  let component: OauthModalComponent;
  let fixture: ComponentFixture<OauthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
