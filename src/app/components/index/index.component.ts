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
  }

  selectChange($event) {
    console.log('$event', $event);
  }

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

  quit() {
    this.auth.logout()
      .subscribe(res => {
        this.router.navigate(['/account/login']);
      });
  }

  imageSrc() {
    const base = session.basePath;
    return base + 'assets/icons/svg/logo.svg';
  }
}
