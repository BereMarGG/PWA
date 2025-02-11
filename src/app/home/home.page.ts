import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  @ViewChild('modal', { static: false }) modal!: IonModal;

  username: string = '';
  password: string = '';
  storedUsername: string = '';
  storedPassword: string = '';
  isFormValid: boolean = false;

  constructor(private navCtrl: NavController, private cdr: ChangeDetectorRef) {}

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

  async openModal() {
    if (this.isFormValid) {
      this.storedUsername = this.username;
      this.storedPassword = this.password;

      localStorage.setItem('username', this.storedUsername);
      localStorage.setItem('password', this.storedPassword);

      console.log('Datos guardados en localStorage:');
      console.log('Username:', localStorage.getItem('username'));
      console.log('Password:', localStorage.getItem('password'));

      await this.modal.present();
    }
  }

  async closeModal() {
    await this.modal.dismiss();
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}