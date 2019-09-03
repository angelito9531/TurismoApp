import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private loginService: LoginService,
    private route: Router,
    private storage: Storage) { }

  cerrarSesion() {
    this.loginService.logout().then(() => {
      this.storage.clear();
      this.route.navigateByUrl('login');
    })
  }
}
