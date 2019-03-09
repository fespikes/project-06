import { Component, OnInit } from '@angular/core';

import {ApiService} from 'app/shared';


@Component({
  selector: 'fed-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  sent = false;
  to: number;

  constructor() { }

  ngOnInit() {
  }

}
