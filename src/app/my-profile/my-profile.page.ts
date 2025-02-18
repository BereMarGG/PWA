import { Component, OnInit } from '@angular/core';
//author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false
})
export class MyProfilePage implements OnInit {

  username: string = '';
  email: string = '';
  role: string = '';

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'Usuario';
    this.email = localStorage.getItem('email') || 'Sin email';
    this.role = localStorage.getItem('role') || 'Sin rol';
  }
}
