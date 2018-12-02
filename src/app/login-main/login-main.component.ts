import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'fed-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.sass']
})
export class LoginMainComponent implements OnInit {

  login = this.fb.group({
    name: [''],
    password: [''],
    verfication_coee: [''],
    stay: [''],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  submit() {

  }

}
