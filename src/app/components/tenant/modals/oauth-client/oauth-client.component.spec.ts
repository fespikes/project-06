import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthClientComponent } from './oauth-client.component';
import { TestModule } from 'app/shared/test.module';

describe('OauthClientComponent', () => {
  let component: OauthClientComponent;
  let fixture: ComponentFixture<OauthClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ OauthClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
