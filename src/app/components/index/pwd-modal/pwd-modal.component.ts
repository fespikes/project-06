import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { patterns } from 'app/shared';
import { IndexService } from '../index.service';
import { session } from 'app/shared/utils';
import { TuiModalRef, TuiMessageService } from 'tdc-ui';

@Component({
  selector: 'fed-pwd-modal',
  templateUrl: './pwd-modal.component.html',
  styleUrls: ['./pwd-modal.component.sass']
})
export class PwdModalComponent implements OnInit {
  myForm: FormGroup;
  userName: string;
  params: any = {
    oldPassword: '',
    newPassword: '',
    confirm: '',
  };

  constructor(
    fb: FormBuilder,
    private service: IndexService,
    private message: TuiMessageService,
  ) {
    this.userName = session.userName
    this.myForm = fb.group({
    'oldPassword': ['', Validators.required],
    'newPassword': [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(patterns.password),
        (control: FormControl) => {
          return this.confirmValidator.bind(this)(control, 'oldPassword');
        }
      ])
    ],
    'confirm': [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(patterns.password),
        (control: FormControl) => {
          return this.confirmValidator.bind(this)(control, 'newPassword', true);
        }
      ])
    ]
    });
  }

  confirmValidator(control: FormControl, target: string, inverse?: boolean): { [s: string]: boolean } {
    if (inverse && (control.value !== this.params[target])) {
      return {invalidCompare: true};
    } else if (control.value === this.params[target] && !inverse) {
      return {invalidCompare: true};
    }
  }

  ngOnInit() {}

  onSubmit(value: {[s: string]: string}) {
    delete value.confirm;
    this.service.changePWD(this.userName, {...value})
      .subscribe(res => {
        this.message.success('密码修改成功!');
      });
  }

}
