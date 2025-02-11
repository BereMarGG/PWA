import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  passwordMismatch = false;
  users: any[] = [];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  removeSpaces(event: any) {
    event.target.value = event.target.value.replace(/\s/g, '');
  }

  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
    this.registerForm.patchValue({ fullName: event.target.value });
  }

  validatePasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  validateEmail() {
    if (this.email?.invalid && (this.email?.dirty || this.email?.touched)) {
      console.warn('Correo inválido detectado');
    }
  }

  register() {
    if (this.registerForm.invalid || this.passwordMismatch) {
      this.registerForm.markAllAsTouched();
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }
    this.users.push(this.registerForm.value);
    console.log('Usuarios registrados:', this.users);
    alert('¡Registro exitoso!');
    this.registerForm.reset();
  }
  
}  