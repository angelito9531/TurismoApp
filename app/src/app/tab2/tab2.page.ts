import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { LugarService } from '../services/lugar.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  hoteles: any = [];
  segment: string;
  lugares: any = [];
  constructor(private route: Router, private lugarService: LugarService,
    public _DomSanitizationService: DomSanitizer,
    public actionSheetController: ActionSheetController) {
    this.listarMoteles();
    this.listarLugares();
    this.segment = "hoteles"

  }
  registrar() {
    console.log(this.hoteles);
    this.route.navigateByUrl("/registrar");
  }
  informacion(id) {
    this.route.navigateByUrl("/informacion/" + id);
  }
  listarMoteles() {
    this.lugarService.listarHoteles().subscribe((data) => {

      this.hoteles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };

      })
      console.log(this.hoteles);
    });
  }
  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.borrar(item.id);
        }
      }, {
        text: 'Actualizar',
        icon: 'create',
        handler: () => {
          this.actualizar(item.id);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  borrar(id) {
    this.lugarService.eliminar(id);
  }
  actualizar(id) {
    this.route.navigateByUrl("/actualizar/" + id);
  }
  listarLugares() {
    this.lugarService.listarLugares().subscribe((data) => {

      this.lugares = data.map(e => {

        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };

      })
    });
  }
}
