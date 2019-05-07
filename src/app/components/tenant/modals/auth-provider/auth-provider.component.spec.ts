import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProviderComponent } from './auth-provider.component';
import { TestModule } from 'app/shared/test.module';

describe('AuthProviderComponent', () => {
  let component: AuthProviderComponent;
  let fixture: ComponentFixture<AuthProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ AuthProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
