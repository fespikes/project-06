import { Component, OnInit, HostBinding } from '@angular/core';
import { combineLatest } from 'rxjs';

import { TuiMessageService } from 'tdc-ui';
import { AccessTokenService } from './access-token.service';
import { actionTypes } from './access-token.model';
import { ModalsService } from './modals/modals.service'
import { Paging, ObjectToArray } from 'app/shared';

@Component({
  selector: 'fed-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.sass']
})
export class AccessTokenComponent implements OnInit {
  @HostBinding('class.main') hostClass = true;
  actionTypes = actionTypes;
  loading = false;
  selectedIndex = 1;
  tenantASToken: any[];
  ownASToken: any[];
  filter: any = {
    // clientId: '',
    tokenSource: '',
    // searchValue: '',
    // pageSize: '',
    // pageNumber: ''
  };
  tenantPaging = Paging.instance();
  ownPaging = Paging.instance();

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
      this.fetchTokens('CLIENT', this.tenantPaging),
      this.fetchTokens('USER ', this.ownPaging)
    ];
    this.loading = true;
    combineLatest(promises)
      .subscribe(([tenantASTokenRes, ownASTokenRes]) => {
        this.tenantASToken =(tenantASTokenRes as any).body;
        this.ownASToken = (ownASTokenRes as any).body;
        this.loading = false;
      });
  }

  fetchTokens(tokenSource, paging, refresh?) {
    const filter = {...this.filter};
    filter.tokenSource = tokenSource;
    filter.pageNumber = paging.page;
    filter.pageSize = paging.size;
    if(refresh === undefined) {
      return this.service.tokens('get', filter)
    } else if(!!refresh) {
      return this.service.tokens('get', filter)
        .subscribe( res => {
          if (tokenSource === 'CLIENT') {
            this.tenantASToken = res.body;
          } else {
            this.ownASToken = res.body;
          }
        });
    }
  }

  setPaging(paging, res) {
    paging.itemCount = res.itemCount;
    paging.pageNumber = res.pageNumber;
    paging.pageSize = res.pageSize;
  }

  tabChange($event) {}

  openAccessTokenModal(type, item?) {
    this.modal.accessTokenModal(type, item)
      .subscribe(res => {
        // TODO: untill the solution of "Authorization"
        if (type === actionTypes['remove']) {
          this.service.tokens('delete', undefined, {
            'GF-Access-Token': item.name
          }).subscribe(res => {
            this.fetchTokens('USER', this.ownPaging, true);
          });
        } else {
          this.fetchTokens('USER', this.ownPaging, true);
          if (type === actionTypes['create']) {
            this.openAccessTokenModal(actionTypes['return'], res);
          } else if (type === actionTypes['return']) {
            this.openAccessTokenModal(actionTypes['refresh'], item);
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
          element.status = taskes.filter(ele => ele.name === element.name)['status'];
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

  // TODO: untill the solution of "Authorization"
  toRefreshNow(token) {
    this.service.tokens(
      'put',
      undefined,
      {'GF-Refresh-Token': token.refreshToken.value}
    ).subscribe( res => {
      this.message.success(`"${res.name}" 刷新成功！`);
      this.fetchTokens('USER ', this.ownPaging, true);
    });
  }

}
