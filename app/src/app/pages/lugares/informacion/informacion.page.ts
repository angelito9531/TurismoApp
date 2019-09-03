import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LugarService } from 'src/app/services/lugar.service';
import { LugarTuristico } from 'src/app/models/lugar_turistico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  lugar: LugarTuristico = new LugarTuristico();

  foto: any;
  id: string
  constructor(
    private userService: UsuarioService,
    private lugarService: LugarService,
    private activateRouter: ActivatedRoute
  ) {
    this.id = activateRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.lugarService.buscar(this.id).subscribe((data) => {

      this.lugar = data.data() as any;


    })
  }

}
