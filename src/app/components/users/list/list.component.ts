import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';


@Component({
  selector: 'fed-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  users: any[];

  constructor(
    private service: UsersService
  ) { }

  ngOnInit() {
  }

}
