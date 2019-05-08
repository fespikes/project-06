import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';
import { AuthService, LoginInfo, session } from 'app/shared';
import { I18nLangService } from 'app/i18n';
import { TuiMessageService } from 'tdc-ui'

function captchaValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const test = (control.value.length === 4);
    return test ? null : { 'invalid captcha': 'length must be 4' };
  }
}

@Component({
  selector: 'fed-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  captchaUrl: string = '';
  roles = {
    federation: 'FEDERATION'
  };

  role: string = '';
  languages = [
    { value: 'zh_CN', name: '中文' },
    { value: 'en_US', name: 'English' },
  ];

  loginForm: any;

  get loginPayload(): LoginInfo {
    const loginValue = this.loginForm.value as LoginInfo;
    const result = {...loginValue};
    return result;
  }

  errorMsg: string = '';

  set error(err: any) {
    this.errorMsg = err.message;
  }

  get error() {
    return false;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private i18nLang: I18nLangService,
    private service: AccountService,
    private message: TuiMessageService
  ) {
    this.role = this.roles.federation;
    this.captchaUrl = this.service.captchaUrl();
  }

  ngOnInit() {
    this.getFormGroup();
  }

  submit() {
    this.auth.login(this.loginPayload)
      .subscribe((res) => {
        if (res && res.redirect_url) {
          window.location.href = res.redirect_url;
          return ;
        }
        this.message.success('登录成功');
        this.auth.currUser.name = this.loginForm.value.name;
        this.auth.currUser.tenant = this.loginForm.value.tenant;
        this.router.navigate(['/index/tenant/list']);
      }, error => {
        this.resetCapture();
      });
  }

  switchAccountType(role) {
    this.role = role;
    this.getFormGroup();
  }

  switchLang(lang) {
    this.i18nLang.switch(lang);
  }

  getSelected(v: string) {
    return v === this.i18nLang.lang;
  }

  getFormGroup() {
    const group: any = {
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    };
    if (this.role === this.roles['federation']) {
      delete group.tenant;
    } else {
      group.tenant = ['', Validators.required];
    }
    this.loginForm = this.fb.group(group);
  }

  logoUrl() {
    return session.basePath + 'assets/icons/symbols/f-logo.svg';
  }

  resetCapture() {
    this.captchaUrl = this.service.captchaUrl();
  }

}
