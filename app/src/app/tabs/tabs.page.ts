import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popovers/popover/popover.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private loginService: LoginService,
    private route: Router,
    private storage: Storage,
    public popoverController: PopoverController) { }

  cerrarSesion() {
    this.loginService.logout().then(() => {
      this.storage.clear();
      this.route.navigateByUrl('login');
    })
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true,
      mode:"ios"
    });
    return await popover.present();
  }
}
