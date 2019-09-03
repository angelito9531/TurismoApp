import { Component, OnInit } from '@angular/core';
import { PromocionesService } from 'src/app/services/promociones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Promociones } from 'src/app/models/promociones';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  registroForm: FormGroup;
  foto: any;
  id: any;
  promocion: Promociones;
  constructor(private promo: PromocionesService,
    private imagePicker: ImagePicker,
    private activateRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController) {
    this.crearFormRegistro();
    this.id = activateRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  registro() {
    if (this.registroForm.valid) {
      this.promocion = this.registroForm.value;

      this.promocion.empresa = this.id;
      this.promocion.foto = this.foto;
      console.log(this.promocion);
      if (this.promocion.foto != undefined) {

        this.promo.crear(this.promocion);
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
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
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
