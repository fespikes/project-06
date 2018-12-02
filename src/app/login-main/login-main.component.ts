import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'fed-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.sass']
})
export class LoginMainComponent implements OnInit {

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    captcha: [''],
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
