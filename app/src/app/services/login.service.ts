import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioOnly: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private storage: Storage) {

    /*this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        this.storage.set('login', userResponse);
      } else {
        this.storage.set('login', null);
      }
    })*/
  }

  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }

}
