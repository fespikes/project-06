import { Component, OnInit } from '@angular/core';

import { IndexService } from '../index.service';
import { session } from 'app/shared/utils';
import { federation_server } from 'app/shared/app.tokens';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

@Component({
  selector: 'fed-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.sass'],
  providers: [
    {
      provide: federation_server,
      useValue: null
    }
  ],
})
export class ProfileModalComponent implements OnInit {
  user: any = {
    roles: []
  };

  constructor(
    private service: IndexService,
    private self: TuiModalRef
  ) { }

  ngOnInit() {
    const userName = session.getUserName();
    this.service.getProfile(userName)
      .subscribe(res => {
        this.user = res;
      });
  }

  closeSelf() {
    this.self.close('')
  }

}
