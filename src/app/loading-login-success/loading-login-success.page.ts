/**
 * Autor: María Berenice García Gutiérrez
 */

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-loading-login-success',
  templateUrl: './loading-login-success.page.html',
  styleUrls: ['./loading-login-success.page.scss'],
  standalone: false
})

  export class LoadingLoginSuccessPage implements OnInit {

    constructor(private navCtrl: NavController) {}
  
    ngOnInit() {
      setTimeout(() => {
        this.navCtrl.navigateForward('/home');
      }, 3000);
    }
  }
