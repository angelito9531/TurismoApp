import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ValidacionLoginGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private storage: Storage) {

  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let estadoSesion = this.verificarSesionUsuario();

    if (!await estadoSesion) {
      console.log("No hay sesion guardada.")
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  async verificarSesionUsuario() {
    let storage = null;
    await this.storage.get('usuario').then((val) => {
      storage = val;
    });
    return storage;
  }
}
