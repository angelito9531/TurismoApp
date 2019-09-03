import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LugarTuristico } from '../models/lugar_turistico';
import { Promociones } from '../models/promociones';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {


  constructor(private firestore: AngularFirestore) { }

  listar() {
    return this.firestore.collection('promociones').snapshotChanges();
  }

  listarHoteles() {
    return this.firestore.collection('promociones', ref => ref.where("tipo", "==", "hotel")).snapshotChanges();
  }

  listarpromociones() {
    return this.firestore.collection('promociones', ref => ref.where("tipo", "==", "lugarturistico")).snapshotChanges();
  }

  listarpromocionedehotel(id) {
    return this.firestore.collection('promociones', ref => ref.where("empresa", "==", id)).snapshotChanges();
  }




  buscar(id: string) {

    //return this.firestore.collection('client').doc(clientId).snapshotChanges();
    return this.firestore.collection('promociones').doc(id).get();
  }


  crear(datos: Promociones) {
    //client.user = this.loginService.userId;
    //client.state_delete = false;

    return this.firestore.collection('promociones').add(datos);
  }

  actualizar(id: string, datos: Promociones) {
    //client.user = this.loginService.userId;
    return this.firestore.collection('promociones').doc(id).update(datos);
  }

  eliminar(id: string) {
    return this.firestore.collection('promociones').doc(id).delete();
  }
}
