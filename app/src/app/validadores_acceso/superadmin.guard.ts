import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private storage: Storage) {

  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let estadoSesion = this.verificarSesionUsuario();

    if (await estadoSesion != "superadmin") {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  async verificarSesionUsuario() {
    let storage = null;
    await this.storage.get('usuario').then((val) => {
      storage = val.tipo_usuario;
    });
    return storage;
  }
}
