import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LugarService } from 'src/app/services/lugar.service';
import { LugarTuristico } from 'src/app/models/lugar_turistico';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocionesService } from 'src/app/services/promociones.service';
import { Promociones } from 'src/app/models/promociones';
import { ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  lugar: LugarTuristico = new LugarTuristico();

  foto: any;
  id: string
  promociones: Promociones[] = [];
  constructor(
    private userService: UsuarioService,
    private route: Router,
    private lugarService: LugarService,
    private activateRouter: ActivatedRoute,
    public _DomSanitizationService: DomSanitizer,
    public actionSheetController: ActionSheetController,
    private promocionesServ: PromocionesService
  ) {
    this.id = activateRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.lugarService.buscar(this.id).subscribe((data) => {

      this.lugar = data.data() as any;


    })
    this.getPromociones();
  }
  registrarp() {
    console.log(this.id);
    this.route.navigateByUrl("/crear/" + this.id);
  }
  getPromociones() {
    this.promocionesServ.listarpromocionedehotel(this.id).subscribe((data) => {

      this.promociones = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as any;

      })

    });
  }

}
