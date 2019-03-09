import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginInfo } from 'app/shared';
import { I18nLangService } from 'app/i18n';

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

  roles = {
    federation: 'FEDERATION'
  };

  role: string;
/*   languages = [
    { value: 'zh_CN', name: '中文' },
    { value: 'en_US', name: 'English' },
  ]; */

  loginForm: any;

  get loginPayload(): LoginInfo {
    const loginValue = this.loginForm.value as LoginInfo;
    const result = {...loginValue};
    if (this.role === this.roles['federation']) {
      result.username = loginValue.name + '#FEDERATION';
    } else {
      result.username = loginValue.name + '#' + loginValue.tenant;
    }
    return result;
  }

  errorMsg: string;

  set error(err: any) {
    this.errorMsg = err.message;
  }

  get error() {
    return false;
  }

  getFormGroup() {
    const group = {
      tenant: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    };
    if (this.role === this.roles['federation']) {
      delete group.tenant;
    }

    this.loginForm = this.fb.group(group);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private i18nLang: I18nLangService,
  ) {
    this.role = this.roles.federation;
  }

  ngOnInit() {
    this.getFormGroup();
  }

  submit() {
    this.auth.login(this.loginPayload).subscribe(() => {
      this.auth.currUser.name = this.loginForm.value.name;
      this.auth.currUser.tenant = this.loginForm.value.tenant;      
      this.router.navigate(['main']);
    }, 
    (error) => {

    });
  }

  switchAccountType(role) {
    this.role = role;
    this.getFormGroup();
  }

  // switchLang(lang) {
  //   this.i18nLang.switch(lang);
  // }

  getSelected(v: string) {
    return v === this.i18nLang.lang;
  }

}
