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
  selector: 'fed-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.sass']
})
export class LoginMainComponent implements OnInit {

  languages = [
    { value: 'zh_CN', name: '中文' },
    { value: 'en_US', name: 'English' },
  ];

  loginForm = this.fb.group({
    tenant: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    // captcha: ['', [Validators.required, captchaValidator()]],
    remember: [''],
  })

  get loginPayload(): LoginInfo {
    const loginValue = this.loginForm.value as LoginInfo; 
    return {
      tenant: loginValue.tenant,
      name: loginValue.name,
      password: loginValue.password,
      username: loginValue.name + '#' + loginValue.tenant,
    }
  }

  errorMsg: string;

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
  ) { }

  ngOnInit() {
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

  switchLang(lang) {
    this.i18nLang.switch(lang);
    console.log (this.i18nLang.lang);
  }

  getSelected(v: string) {
    return v === this.i18nLang.lang;
  }

}
