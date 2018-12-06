import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
    username: ['', Validators.required],
    password: ['', Validators.required],
    captcha: ['', [Validators.required, captchaValidator()]],
    remember: [''],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.loginForm.value);
  }

}
