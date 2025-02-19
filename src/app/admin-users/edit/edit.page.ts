import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef } from '@angular/core';

//author: Maria Berenice Garcia Gutierrez 


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false
})
export class EditPage implements OnInit {
  users: any[] = [];
  isModalOpen = false;
  registerForm: FormGroup;
  selectedUser: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private cdr: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  // Obtener la lista de usuarios desde Firebase
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log('Usuarios obtenidos:', users);
      this.users = users;
    });
  }
  

  // Abrir modal y cargar datos del usuario seleccionado
  openEditModal(user: any) {
    if (!user) return;
  
    console.log("Usuario seleccionado antes de asignar:", user);
    this.selectedUser = user;
  
    setTimeout(() => {
      console.log("PatchValue con:", this.selectedUser);
      this.registerForm.patchValue({
        email: this.selectedUser.email || '',
        username: this.selectedUser.username || ''
      });
    }, 100);
  
    this.isModalOpen = true;
    console.log("isModalOpen:", this.isModalOpen);
    
  }
  
  

  // Cerrar modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  // Actualizar usuario en Firebase
  async updateUser() {
    if (this.registerForm.valid && this.selectedUser) {
      try {
        const updatedData = {
          email: this.registerForm.value.email,
          username: this.registerForm.value.username
        };

        console.log('Enviando actualización:', updatedData);

        await this.userService.updateUser(this.selectedUser.id, updatedData);
        this.closeModal();
        console.log('Usuario actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    }
  }
}
