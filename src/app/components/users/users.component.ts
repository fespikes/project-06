import { Component, OnInit, HostBinding } from '@angular/core';
import { UsersService } from './users.service';

import { ModalsService } from './modals';
import { Paging, ObjectToArray } from 'app/shared';
import { roles } from './users.model';

@Component({
  selector: 'fed-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  @HostBinding('class.main') hostClass = true;

  users: any[] = [];
  roles = ObjectToArray(roles, true);
  filter: any = {searchValue: ''};
  paging = Paging.instance();

  constructor(
    private service: UsersService,
    private modal: ModalsService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.filter.pageNumber = this.paging.pageNumber;
    this.filter.pageSize = this.paging.pageSize;
    delete this.filter.roles; // templetely remove it

    this.service.users('get', this.filter)
      .subscribe( res => {
        this.users = res.body;
        // TODO: the paging
        this.paging.afterReturn(res.pageNumber, res.pageSize, res.itemCount);
      });
  }

  toUserModal(type, user?) {
    this.modal.userModal(type, user)
      .subscribe(res => {
        if (type === 'remove') {
          return this.service.users('delete', {username: user.username})
            .subscribe( res => {
              this.fetchData();
            })
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
