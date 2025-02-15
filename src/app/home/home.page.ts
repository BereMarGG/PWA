import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  username = 'Usuario';

  constructor(private router: Router) {}

  goToFeature(feature: string) {
    console.log(`Navegando a ${feature}`);
    this.router.navigateByUrl(`/${feature}`);
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}