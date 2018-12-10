import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginInfo } from 'app/shared';

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

  set error(err: any) {
    
  }

  get error() {
    return false;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
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

}
