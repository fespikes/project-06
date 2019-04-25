import { Component, OnInit, HostBinding } from '@angular/core';
import { combineLatest } from 'rxjs';

import { TuiMessageService, Pagination } from 'tdc-ui';
import { AccessTokenService } from './access-token.service';
import { actionTypes } from './access-token.model';
import { ModalsService } from './modals/modals.service'

@Component({
  selector: 'fed-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.sass']
})
export class AccessTokenComponent implements OnInit {
  @HostBinding('class.main') hostClass = true;
  actionTypes = actionTypes;
  loading = false;
  selectedIndex = 0;
  tenantASToken: any[];
  ownASToken: any[];
  filter: any = {
    // clientId: '',
    tokenSource: '',
    // searchValue: '',
    // pageSize: '',
    // pageNumber: ''
  };
  tenantPaging = new Pagination();
  ownPaging = new Pagination();

  constructor(
    private service: AccessTokenService,
    private modal: ModalsService,
    private message: TuiMessageService
  ) {}

  ngOnInit() {
    this.fetchData();
    // setTimeout(function() {
    //   this.openAccessTokenModal('return', {name: 'rock'});
    // }.bind(this), 0)
  }

  fetchData() {
    const promises = [
      this.fetchTokens('CLIENT', 'tenantPaging'),
      this.fetchTokens('USER', 'ownPaging')
    ];
    this.loading = true;
    combineLatest(promises)
      .subscribe(([tenantASTokenRes, ownASTokenRes]) => {
        const tenant: any = tenantASTokenRes;
        const own: any = ownASTokenRes;
        this.tenantASToken = this.adjustTokens((tenantASTokenRes as any).body);
        this.setPaging('tenantPaging', tenant);

        this.ownASToken = this.adjustTokens((ownASTokenRes as any).body);
        this.setPaging('ownPaging', own);
        this.loading = false;
      });
  }

  fetchTokens(tokenSource, paging, refresh?) {
    const filter = {...this.filter};
    filter.tokenSource = tokenSource;
    filter.pageNumber = this[paging].page;
    filter.pageSize = this[paging].size;
    filter.withTokenRefreshTask = true;
    if(refresh === undefined) {
      return this.service.tokens('get', filter)
    } else if(!!refresh) {
      return this.service.tokens('get', filter)
        .subscribe( res => {
          if (tokenSource === 'CLIENT') {
            this.tenantASToken = this.adjustTokens(res.body);
            this.setPaging('tenantPaging', res);
          } else {
            this.ownASToken = this.adjustTokens(res.body);
            this.setPaging('ownPaging', res);
          }
        });
    }
  }

  setPaging(paging, res) {
    if (res.pageNumber && res.pageSize && res.totalPageNumber) {
      this[paging] = {
        page: res.pageNumber,
        size: res.pageSize,
        total: res.totalPageNumber * res.pageSize
      };
    } else {
      this[paging] = {
        'page': 1,
        'total': 0,
        'size': 10,
      };;
    }
  }

  tabChange($event) {}

  openAccessTokenModal(type, item?) {
    this.modal.accessTokenModal(type, item)
      .subscribe(res => {
        // TODO: untill the solution of "Authorization"
        if (type === actionTypes['remove']) {
          this.service.tokens('delete', undefined, {
            'GF-Access-Token': item.value
          }).subscribe(res => {
            if (res) {
              this.message.success(`"${res.name}" 已删除！`);
            }
            this.fetchTokens('USER', 'ownPaging', true);
          });
        } else {
          this.fetchTokens('USER', 'ownPaging', true);
          if (type === actionTypes['create']) {
            this.openAccessTokenModal(actionTypes['return'], res);
          } else if (type === actionTypes['return']) {
            // if (res.task) {
              this.openAccessTokenModal(actionTypes['refresh'], item);
            // }
          }
        }
      });
  }

  adjustTokens(tokens, taskes?) {
    if (!tokens) return;
    return tokens.map(element => {
      element.attributes = [];
      const info = element.additionalInfo;
      Object.keys(info).forEach(item => {
        if (taskes) {
          element.status = taskes.filter(ele => {
            return ele.name === element.name;
          })['status'];
        } else {
          element.attributes.push({
            key: item,
            value: info[item]
          });
        }
      });
      if (element.attributes.length === 0) {
        delete element.attributes;
      }
      return element;
    });
  }

  toRefreshNow(token) {
    this.service.tokens(
      'put',
      undefined,
      {'GF-Refresh-Token': token.refreshToken.value}
    ).subscribe( res => {
      this.message.success(`"${res.name}" 刷新成功！`);
      this.fetchTokens('USER ', 'ownPaging', true);
    });
  }

}
