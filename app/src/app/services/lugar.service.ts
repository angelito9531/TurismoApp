import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LugarTuristico } from '../models/lugar_turistico';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private firestore: AngularFirestore) { }

  listar() {
    return this.firestore.collection('lugares').snapshotChanges();
  }

  listarHoteles() {
    return this.firestore.collection('lugares', ref => ref.where("tipo", "==", "hotel")).snapshotChanges();
  }

  listarLugares() {
    return this.firestore.collection('lugares', ref => ref.where("tipo", "==", "lugarturistico")).snapshotChanges();
  }




  buscar(id: string) {
    //return this.firestore.collection('client').doc(clientId).snapshotChanges();
    return this.firestore.collection('lugares').doc(id).get();
  }

  crear(datos: LugarTuristico) {
    //client.user = this.loginService.userId;
    //client.state_delete = false;

    return this.firestore.collection('lugares').add(datos);
  }

  actualizar(id: string, datos: LugarTuristico) {
    //client.user = this.loginService.userId;
    return this.firestore.collection('lugares').doc(id).update(datos);
  }

  eliminar(id: string) {
    return this.firestore.collection('lugares').doc(id).delete();
  }
}
