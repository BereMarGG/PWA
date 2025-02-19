import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  // Obtener la lista de usuarios desde Firestore
  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'id' });
  }

  // Actualizar usuario por ID
  updateUser(id: string, data: any): Promise<void> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return updateDoc(userDoc, data)
      .then(() => console.log('Usuario actualizado correctamente'))
      .catch(error => console.error('Error al actualizar usuario:', error));
  }
}
