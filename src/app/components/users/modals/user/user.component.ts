import { Component, OnInit, Inject } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { UsersService } from '../../users.service';
import { ObjectToArray } from 'app/shared/utils';
import { patterns, forbiddenEmailValidator, session } from 'app/shared';

@Component({
  selector: 'fed-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  myForm: FormGroup;
  actionType: string;
  user: any;
  isFedAdmin = true;
  params: any = {
    password: '',
    newPassword: '',
    confirm: '',
  };
  roles = {};

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private service: UsersService
  ) {
    this.actionType = data.type;
    this.user = data.user;
    this.isFedAdmin = session.isFedAdmin
    const me = this;

    let group: any;
    if (this.actionType === 'register') {
      group = {
        'username': ['', Validators.required],
        'email': ['', Validators.compose([
          Validators.required,
          Validators.pattern(patterns.email),
          forbiddenEmailValidator(patterns.notAllowedEmailPattern)
        ])],
        'password': ['', Validators.compose([
          Validators.required,
          Validators.pattern(patterns.password)
        ])],
        'confirm': [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(patterns.password),
            function(control: FormControl) {
              return me.confirmValidator.bind(me)(control, 'password');
            },
          ])
        ],
        'description': [''],
        // 'phone': ['', Validators.required],
        // 'roles': ['']
      };
    } else if(this.actionType === 'edit') {
      group = {
        'username': [this.user.username, Validators.required],
        'email': [this.user.email, Validators.compose([
          Validators.required,
          Validators.pattern(patterns.email),
          forbiddenEmailValidator(patterns.notAllowedEmailPattern)
        ])],
        'description': [this.user.description],
      };
      this.user.roles.forEach(element => {
        this.roles[element] = true;
      });
    } else if (this.actionType === 'reset-pwd') {
      group = {
        'newPassword': ['', Validators.compose([
          Validators.required,
          Validators.pattern(patterns.password)
        ])]
      }
    }
    this.myForm = fb.group(group);
    if (this.actionType === 'edit') {
      this.myForm.get('username').disable();
      this.myForm.get('email').disable();
    }
  }

  confirmValidator(control: FormControl, target: string): { [s: string]: boolean } {
    if (control.value !== this.params[target]) {
      return {invalidCompare: true};
    }
  }

  ngOnInit() {}

  submit(val: {[s:string]: string}) {
    const params: any = {...val};
    let method;
    if ((this.actionType === 'register' || this.actionType === 'edit') && session.isFedAdmin ){
      params.roles = ObjectToArray(this.roles).filter(item => this.roles[item]);
    }

    switch (this.actionType) {
      case 'register':
        method = 'post';
        break;
      case 'edit':
        method = 'put';
        params.username = this.user.username;
        params.email = this.user.email;
        break;
      case 'reset-pwd':
        method = 'put';
        delete params.confirm;
        params.username = this.user.username;
        break;
      default:
        method = 'delete';
        params.username = this.user.username;
        break;
    }
    this.service.users(method, params)
      .subscribe(res => {
        this.modal.close(res);
      });
  }

}
