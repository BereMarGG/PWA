import { Component, OnInit } from '@angular/core';
//author: Maria Berenice Garcia Gutierrez


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage {

  username: string = '';
  role: string = '';

  addUser() {
    console.log(`Usuario agregado: ${this.username}, Rol: ${this.role}`);
  }

}
