import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { PromocionesService } from '../services/promociones.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  promociones: any = [];
  constructor(public _DomSanitizationService: DomSanitizer,
    public actionSheetController: ActionSheetController,
    private promoServ: PromocionesService) { }
  ngOnInit() {
    this.promoServ.listar().subscribe((data) => {

      this.promociones = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as any;

      })

    });
  }

  infoPromocion() {

  }

}
