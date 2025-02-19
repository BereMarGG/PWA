import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';

// author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage {
  addUserForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  validatePasswordMatch() {
    const password = this.addUserForm.get('password')?.value;
    const confirmPassword = this.addUserForm.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  async addUser() {
    if (this.addUserForm.invalid || this.passwordMismatch) return;

    const { email, username, password, role } = this.addUserForm.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      const hashedPassword = bcrypt.hashSync(password, 10);
      const encryptedRole = btoa(role); // Codifica el rol en Base64

      await setDoc(doc(this.firestore, 'users', uid), {
        email,
        username,
        password: hashedPassword,
        role: encryptedRole,
        created_at: new Date()
      });

      this.showAlert('Éxito', 'Usuario agregado correctamente.');
      this.router.navigate(['/admin-users']); // Redirigir a la lista de usuarios
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      this.showAlert('Error', 'Hubo un problema al agregar el usuario.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  // Validación de email
  validateEmail() {
    const emailControl = this.addUserForm.get('email');
    if (emailControl?.invalid && (emailControl.dirty || emailControl.touched)) {
      this.showAlert('Correo inválido', 'Por favor, ingresa un correo válido.');
    }
  }

  // Convertir el nombre en mayúsculas
  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  // Eliminar espacios en el nombre de usuario
  removeSpaces(event: any) {
    event.target.value = event.target.value.replace(/\s/g, '');
  }
}
