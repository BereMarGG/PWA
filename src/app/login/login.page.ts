import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    public router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      
      // Obtener datos del usuario desde Firestore
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        // Guardar los datos en localStorage
        localStorage.setItem('token', await user.getIdToken());
        localStorage.setItem('username', userData['username']);
        localStorage.setItem('email', userData['email']);
        localStorage.setItem('role', atob(userData['role']));


        console.log('Usuario autenticado:', userData);
        console.log("role");

        // Redirigir al Home
        this.router.navigate(['/home']);
      } else {
        this.showAlert('Error', 'No se encontraron datos del usuario.');
      }
    } catch (error: any) {
      this.showAlert('Error', this.getFirebaseErrorMessage(error.code));
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  getFirebaseErrorMessage(code: string): string {
    const errors: { [key: string]: string } = {
      'auth/user-not-found': 'El usuario no existe.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-email': 'Formato de correo inválido.',
      'auth/user-disabled': 'Cuenta deshabilitada.',
      'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
    };
    return errors[code] || 'Ocurrió un error. Inténtalo de nuevo.';
  }
}
