import { Component, OnInit } from '@angular/core';
import { session } from 'app/shared/utils';

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

  constructor() { }

  ngOnInit() {
    if(!session.getUserIsAdmin()) {
      this.menuItems.pop();
    }
  }

  selectChange($event) {
    console.log('$event', $event);

  }

}
