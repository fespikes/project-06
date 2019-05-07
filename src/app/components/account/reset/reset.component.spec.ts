import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from 'app/shared/test.module';

import { ResetComponent } from './reset.component';
import { AccountService } from '../account.service';
import { AccountServiceStub } from '../account.service.stub';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ ResetComponent ],
      providers: [
        {
          provide: AccountService,
          useClass: AccountServiceStub,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
