import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/shared';
import { MainComponent } from './main.component';
import { TranslatePipeSub } from 'app/mock';

const mockUser = {
  tenant: 't',
  name: 'name',
  password: 'psd',
  username: 'uname',
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, TranslatePipeSub ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            currUser: mockUser,
            purgeAuth() {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
