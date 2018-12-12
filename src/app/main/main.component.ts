import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'app/shared';

@Component({
  selector: 'fed-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(
    private auth: AuthService,
  ) { 
    this.user = {...auth.currUser};
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.auth.purgeAuth();
  }

}
