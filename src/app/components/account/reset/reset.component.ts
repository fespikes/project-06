import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';


@Component({
  selector: 'fed-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  sent = false;
  to = 120;

  constructor(private service: AccountService) { }

  ngOnInit() {
  }

  sendLink() {
    this.swithLink();
    let itv = setInterval(() => {
      if (this.to > 0) {
        this.to -= 1;
      } else {
        this.to = 120;
        clearInterval(itv);
        this.swithLink();
      }
    }, 1000);

    this.service.sendRegisterLink()
    .subscribe(res => {
      
    });
  }

  swithLink() {
    this.sent = !this.sent;
  }

}
