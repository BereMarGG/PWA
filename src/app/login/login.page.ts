import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
 @ViewChild('modal', { static: false }) modal!: IonModal;

  username: string = '';
  password: string = '';
  storedUsername: string = '';
  storedPassword: string = '';
  isFormValid: boolean = false;

  constructor(private navCtrl: NavController, private cdr: ChangeDetectorRef,private router: Router) {}

  handleUsernameInput(event: any) {
    this.username = event.target.value.trim();
    this.validateForm();
  }

  handlePasswordInput(event: any) {
    this.password = event.target.value.trim();
    this.validateForm();
  }

  validateForm() {
    this.isFormValid = this.username.length > 0 && this.password.length > 0;
  }


  login() {
    if (this.isFormValid) {
      // Simular un proceso de autenticación con un "loading"
      this.router.navigate(['/loading-login-success']);

      // Después de 3 segundos, redirigir al Home
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    }
  }


  // async openModal() {
  //   if (this.isFormValid) {
  //     this.storedUsername = this.username;
  //     this.storedPassword = this.password;

  //     localStorage.setItem('username', this.storedUsername);
  //     localStorage.setItem('password', this.storedPassword);

  //     console.log('Datos guardados en localStorage:');
  //     console.log('Username:', localStorage.getItem('username'));
  //     console.log('Password:', localStorage.getItem('password'));

  //     await this.modal.present();
  //   }
  // }

  // async closeModal() {
  //   await this.modal.dismiss();
  // }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
