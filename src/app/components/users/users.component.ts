import { Component, OnInit, HostBinding } from '@angular/core';
import { UsersService } from './users.service';
import { TuiMessageService, Pagination } from 'tdc-ui';

import { ModalsService } from './modals';
import { ObjectToArray } from 'app/shared';
import { roles } from './users.model';

@Component({
  selector: 'fed-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  @HostBinding('class.main') hostClass = true;
  loading = false;

  users: any[] = [];
  roles = ObjectToArray(roles, true);
  filter: any = {searchValue: ''};
  paging: Pagination = new Pagination();

  constructor(
    private service: UsersService,
    private modal: ModalsService,
    private message: TuiMessageService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.filter.pageNumber = this.paging.page;
    this.filter.pageSize = this.paging.size;
    delete this.filter.roles;

    this.service.users('get', this.filter)
      .subscribe( res => {
        this.loading = false;
        this.users = res.body;
        this.paging = {
          page: res.pageNumber,
          size: res.pageSize,
          total: res.pageSize * res.totalPageNumber
        };
      });
  }

  toUserModal(type, user?) {
    this.modal.userModal(type, user)
      .subscribe(res => {
        if (type === 'remove' && res) {
          return this.service.users('delete', {username: user.username})
            .subscribe( res => {
              this.fetchData();
            })
        }
        switch (type) {
          case 'reset-pwd':
            this.message.success('重置密码成功!')
            break;
          case 'delete':
            this.message.success('删除成功!')
            break;
          default:
            break;
        }
        this.fetchData();
      })
  }

  dynamicStyles(role) {
    let bgColor = '#';
    switch (role) {
      case roles.admin:
        bgColor += '1D96F3'
        break;
      case roles.Viewer:
        bgColor += 'B8DCC9'
        break;
      case roles.userAdmin:
        bgColor += '93D0F5'
        break;
      case roles.userViewer:
        bgColor += '74B7FE'
        break;
      case roles.tenantAdmin:
        bgColor += '0083B8'
        break;
      case roles.tenantViewer:
        bgColor += '97D1E1'
        break;
    }
    return {
      background:  bgColor
    };
  }

}
