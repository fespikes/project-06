import { Component, OnInit, Inject } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { IndexService } from '../index.service';
import { ObjectToArray } from 'app/shared/utils';
import { patterns, forbiddenEmailValidator, session } from 'app/shared';

@Component({
  selector: 'fed-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.sass']
})
export class InvitationModalComponent implements OnInit {
  myForm: FormGroup;
  actionType: string;
  params = {
    username: '',
    names: []
  };

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private service: IndexService
  ) {
    let group: any;
    this.actionType = data.type;

    // if (this.actionType === 'create') {
      group = {
        'username': ['', Validators.required],
        'email': ['', Validators.required]
      // };
    }
    this.myForm = fb.group(group);
  }

  ngOnInit() {}

  submit(val: {[s:string]: string}) {
    const params: any = {...val};
    let method;
    if (this.actionType === 'create' ){}

    this.service.sendLink(method, params)
      .subscribe(res => {
        this.modal.close(res);
      });
  }
}
