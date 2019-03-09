import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSecretModalComponent } from './client-secret-modal.component';

describe('ClientSecretModalComponent', () => {
  let component: ClientSecretModalComponent;
  let fixture: ComponentFixture<ClientSecretModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSecretModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSecretModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
