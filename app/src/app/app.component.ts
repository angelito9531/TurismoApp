import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageLocal: Storage,
    private loginService: LoginService,
    private route: Router
  ) {
    this.initializeApp();
    this.obtenerInformacionUsuario();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  obtenerInformacionUsuario() {
    this.storageLocal.get('usuario').then(dato => {
      if (dato != null) {
        this.route.navigateByUrl('login');
        this.loginService.usuarioOnly = dato;
      } else {
        this.route.navigateByUrl('login');
      }
    });
  }
}
