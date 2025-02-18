import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';
//author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  validatePasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  async register() {
    if (this.registerForm.invalid || this.passwordMismatch) return;

    const { email, username, password, role } = this.registerForm.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      const hashedPassword = bcrypt.hashSync(password, 10);
      const encryptedRole = btoa(role); // Codifica el rol

      await setDoc(doc(this.firestore, 'users', uid), {
        email,
        username,
        password: hashedPassword,
        role: encryptedRole,
        last_login: new Date()
      });

      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      this.showAlert('Error', 'Hubo un problema al registrar el usuario.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  // Validación de email en caso de ser necesario
  validateEmail() {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.invalid && (emailControl.dirty || emailControl.touched)) {
      this.showAlert('Correo inválido', 'Por favor, ingresa un correo válido.');
    }
  }

  // Función para convertir el nombre en mayúsculas
  toUpperCase(event: any) {
    let value = event.target.value;
    event.target.value = value.toUpperCase();
  }

  // Función para eliminar espacios del nombre de usuario
  removeSpaces(event: any) {
    let value = event.target.value;
    event.target.value = value.replace(/\s/g, '');
  }
}
