import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Usuario } from 'src/app/models/usuario';
import { LugarTuristico } from 'src/app/models/lugar_turistico';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  registroForm: FormGroup;
  lugar: LugarTuristico;
  lista: any = [];
  foto: any;
  constructor(
    private imagePicker: ImagePicker,
    private formBuilder: FormBuilder,
    private lugarService: LugarService,
    private alertController: AlertController,
    private userService: UsuarioService
  ) {
    this.crearFormRegistro();
  }

  ngOnInit() {
    console.log("erftgt4h");
    this.userService.listarAdmins().subscribe((data) => {
      this.lista = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        console.log(this.lista);
      })
    });
  }
  registro() {
    if (this.registroForm.valid) {
      this.lugar = this.registroForm.value;
      this.lugar.ubicacion = { lat: this.registroForm.value.latitud, lng: this.registroForm.value.longitud };

      this.lugar.foto = this.foto;
      if (this.lugar.foto != undefined) {

        this.lugarService.crear(this.lugar);
        this.mensajeAlerta("Registro exitoso");
      } else {
        this.mensajeAlerta("Deve seleccionar una foto");
      }

    } else {
      console.log("verifique sus datos")
    }
  }

  crearFormRegistro() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion_fisica: ['', Validators.required],
      tipo: ['', Validators.required],
      id_administrador: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  async mensajeAlerta(message: string) {
    const alert = await this.alertController.create({
      header: 'MiBar',
      message: message,
      buttons: ['Aceptar']
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
