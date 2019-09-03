import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private loginService:LoginService,
    private storage:Storage,
    private route:Router,
    private popoverController:PopoverController
  ) { }

  ngOnInit() 
  {

  }

  cerrarSesion() {
    this.loginService.logout().then(() => {
      this.storage.clear();
      this.route.navigateByUrl('login');
      this.close();
    })
  }

  close() {
    this.popoverController.dismiss();
  }
  

  

}
