import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { TestModule } from 'app/shared/test.module';
import { ModalsService } from './modal.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ IndexComponent ],
      providers: [
        ModalsService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 1000;
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    component.imageSrc = function() { return ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
