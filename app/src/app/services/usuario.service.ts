import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth) {

  }

  listar() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  buscar(id: string) {
    //return this.firestore.collection('client').doc(clientId).snapshotChanges();
    return this.firestore.collection('usuarios').doc(id).get();
  }

  buscarLogin(email: string) {
    return this.firestore.collection('usuarios', ref => ref.where('email', '>=', email)).snapshotChanges();
  }

  crear(datos: Usuario) {
    //client.user = this.loginService.userId;
    //client.state_delete = false;

    return this.firestore.collection<any>('usuarios').add(datos);
  }

  actualizar(id: string, datos: Usuario) {
    //client.user = this.loginService.userId;
    return this.firestore.collection('usuarios').doc(id).update(datos);
  }

  eliminar(id: string) {
    return this.firestore.collection('usuarios').doc(id).delete();
  }
}
