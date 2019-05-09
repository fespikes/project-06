import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipeStub, DefaultPipeStub } from 'app/mock';

import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';

import { TestModule } from 'app/shared/test.module';
import {
  ApiService,
  AuthService,
  FederationGuard,
} from 'app/shared/services';
import { TuiMessageService } from 'tdc-ui';


import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // TestModule,
        HttpClientModule,
        OverlayModule
      ],
      declarations: [
        DefaultPipeStub,
        TranslatePipeStub,
        ResetComponent
      ],
      providers: [
        ApiService,
        TuiMessageService
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
