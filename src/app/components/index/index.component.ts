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
  dropdownDirection = 'bottomCenter'

  constructor(private modal: ModalsService) { }

  ngOnInit() {
    if(!session.getUserIsAdmin()) {
      this.menuItems.pop();
    }
    this.userName = session.getUserName();
    setTimeout(() => {
      this.showProfile();
    }, 16);
  }

  selectChange($event) {
    console.log('$event', $event);
  }

  showProfile() {
    this.modal.profileModal(this.userName);
  }

}
