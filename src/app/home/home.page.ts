import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
  image: string | null = null;
  selectedFilter: String = 'home';


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
  public async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera, 
      resultType: CameraResultType.Base64   
    });

    this.image =`data:image/jpeg;base64,${image.base64String}`;
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
