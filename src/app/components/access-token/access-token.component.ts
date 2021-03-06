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
    tokenSource: '',
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
  }

  fetchData() {
      this.fetchTokens('CLIENT', 'tenantPaging')
        .subscribe(tenantASTokenRes => {
          this.tenantASToken = this.adjustTokens((tenantASTokenRes as any).body);
          this.setPaging('tenantPaging', tenantASTokenRes);
          this.loading = false;
        });
      this.fetchTokens('USER', 'ownPaging')
        .subscribe(ownASTokenRes => {
          this.ownASToken = this.adjustTokens((ownASTokenRes as any).body);
          this.setPaging('ownPaging', ownASTokenRes);
        });
  }

  fetchTokens(tokenSource, paging, refresh?): any{
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
        if (type === actionTypes['remove'] && res) {
          this.service.tokens('delete', undefined, {
            'GF-Access-Token': item.value
          }).subscribe(res => {
            if (res) {
              this.message.success(`"${res.name}" 已删除！`);
            }
            this.fetchTokens('USER', 'ownPaging', true);
          });
        } else if(res) {
          this.fetchTokens('USER', 'ownPaging', true);
          if (type === actionTypes['create']) {
            this.openAccessTokenModal(actionTypes['return'], res);
          } else if (type === actionTypes['return']) {
            this.openAccessTokenModal(actionTypes['taskCreate'], item);
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

  copy($event) {
    this.message.success($event + '复制成功！')
  }

}
