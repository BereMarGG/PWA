import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//author: Maria Berenice Garcia Gutierrez 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  username: string = 'Usuario';
  role: string = '';
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Maria Berenice Garcia Gutierrez
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedUsername) {
      this.username = storedUsername;
    }
    if (storedRole) {
      this.role = storedRole;
      this.isAdmin = storedRole === 'admin'; // Verificar si es admin
    }
  }

  goToFeature(feature: string) {
    console.log(`Navegando a ${feature}`);
    this.router.navigateByUrl(`/${feature}`);
  }

  logout() {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    this.router.navigateByUrl('/login');
  }
}
