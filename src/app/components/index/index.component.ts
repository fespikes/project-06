import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared';
import { session } from 'app/shared/utils';
import { ModalsService } from './modal.service';
import { I18nLangService } from 'app/i18n';

@Component({
  selector: 'fed-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  menuItems = [
    {path: '/index/tenant/list', label: '租户', icon: 'f-tenant'},
    {path: '/index/access-token', label: 'AccessToken', icon: 'f-access-token'},
    {path: '/index/users', label: '用户管理', icon: 'f-user-admin'}
  ];
  userName: string;
  dropdownDirection = 'bottomCenter';
  languages = [
    { value: 'zh_CN', name: '中文' },
    { value: 'en_US', name: 'English' },
  ];
  logoutUrl: string;

  constructor(
    private router: Router,
    private modal: ModalsService,
    private auth: AuthService,
    private i18nLang: I18nLangService
  ) { }

  ngOnInit() {
    if(!session.isAdmin) {
      this.menuItems.pop();
    }
    this.userName = session.userName;
    this.logoutUrl = this.auth.logout();
  }

  selectChange($event) {}

  showProfile() {
    this.modal.profileModal();
  }

  showInvitationModal() {
    this.modal.invitationModal('create')
      .subscribe(res => {
        console.log(res);
      });
  }

  changePWD() {
    this.modal.pwdModal();
  }

  switchLang(lang) {
    this.i18nLang.switch(lang);
  }

  imageSrc(src) {
    const base = session.basePath;
    return base + 'assets/icons/' + src;
  }
}
