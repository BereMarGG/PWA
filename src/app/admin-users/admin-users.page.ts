import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: false
})
export class AdminUsersPage implements OnInit {
  hasFullPermissions = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
      alert('No tienes permisos para acceder a esta sección');
      this.router.navigateByUrl('/home');
    } else {
      this.hasFullPermissions = true;
    }
  }
}
