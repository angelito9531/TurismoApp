import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LugarTuristico } from 'src/app/models/lugar_turistico';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LugarService } from 'src/app/services/lugar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  registroForm: FormGroup;
  lugar: LugarTuristico;
  lista: any = [];
  foto: any;
  id: string
  constructor(
    private imagePicker: ImagePicker,
    private formBuilder: FormBuilder,
    private lugarService: LugarService,
    private alertController: AlertController,
    private userService: UsuarioService,
    private activateRouter: ActivatedRoute,
    private location: Location

  ) {

    this.id = activateRouter.snapshot.paramMap.get('id');
    this.crearFormRegistro();
  }

  ngOnInit() {

    this.lugarService.buscar(this.id).subscribe((data) => {

      this.lugar = data.data() as any;
      this.crearFormRegistro2(data.data());


    })
  }
  registro() {
    if (this.registroForm.valid) {
      this.lugar.nombre = this.registroForm.value.nombre
      this.lugar.descripcion = this.registroForm.value.descripcion;
      this.lugar.ubicacion_fisica = this.registroForm.value.ubicacion_fisica;
      this.lugar.ubicacion = { lat: this.registroForm.value.latitud, lng: this.registroForm.value.longitud };
      if (this.foto != undefined) {
        this.lugar.foto = this.foto;

      }
      this.lugarService.actualizar(this.id, this.lugar);
      this.mensajeAlerta("Se actualizado el registro");
    } else {
      console.log("verifique sus datos")
    }
  }

  crearFormRegistro() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion_fisica: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  crearFormRegistro2(data) {
    console.log(data);
    this.registroForm = this.formBuilder.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      ubicacion_fisica: [data.ubicacion_fisica, Validators.required],
      latitud: [data.ubicacion.lat, Validators.required],
      longitud: [data.ubicacion.lng, Validators.required],
    });
  }

  async mensajeAlerta(message: string) {
    const alert = await this.alertController.create({
      header: 'MiBar',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }
  selectPhoto() {
    this.imagePicker.getPictures({ outputType: 1, maximumImagesCount: 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.foto = "data:image;base64," + results[i];

      }
    }, (err) => { });
  }

}
