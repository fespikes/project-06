import { Component, OnInit } from '@angular/core';

import { session } from 'app/shared/utils';
import { ModalsService } from './modal.service';

@Component({
  selector: 'fed-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  menuItems = [
    {path: '/index/tenant/list', label: '租户', icon: ''},
    {path: '/index/access-token', label: 'AccessToken'},
    {path: '/index/users', label: '用户管理'}
  ];
  userName: string;
  dropdownDirection = 'bottomCenter';
  languages = [
    { value: 'zh_CN', name: '中文' },
    { value: 'en_US', name: 'English' },
  ];

  constructor(private modal: ModalsService) { }

  ngOnInit() {
    if(!session.isAdmin) {
      this.menuItems.pop();
    }
    this.userName = session.userName;
    /* setTimeout(() => {
      this.changePWD();
    }, 16); */
  }

  selectChange($event) {
    console.log('$event', $event);
  }

  showProfile() {
    this.modal.profileModal();
  }

  changePWD() {
    this.modal.pwdModal();
  }

}
