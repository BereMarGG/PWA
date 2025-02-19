import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//author: Maria Berenice Garcia Gutierrez

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {
  users!: Observable<any[]>;

  constructor(private firestore: Firestore) { }

  ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');
    this.users = collectionData(usersCollection);
    
    this.users.subscribe(data => {
      console.log('Usuarios obtenidos:', data);
    });
  }
  
}
