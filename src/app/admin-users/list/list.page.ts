import { Component, OnInit } from '@angular/core';
//author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {

  users = [
    { username: 'Admin', role: 'admin' },
    { username: 'User1', role: 'user' }
  ];

  ngOnInit() {
  }

}
