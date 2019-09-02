import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  usuario: Usuario;

  constructor(private route: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertController: AlertController) {
    this.crearFormRegistro();
  }

  ngOnInit() {
  }

  regresar() {
    this.route.navigateByUrl('login');
  }

  registro() {
    if (this.registroForm.valid) {
      this.usuario = this.registroForm.value;
      this.usuario.login = { usuario: this.registroForm.value.email, contrasena: this.registroForm.value.contrasena };
      this.usuario.tipo_usuario = 'cliente';
      console.log(this.usuario)
      this.usuarioService.crear(this.usuario).then((data) => {
        this.mensajeAlerta("Registro exitoso, ya puede acceder a la apllicacion.");
        this.route.navigateByUrl('login');
      }, (error) => {
        alert(JSON.stringify(error));
      });
    } else {
      console.log("verifique sus datos")
    }
  }

  crearFormRegistro() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      contrasena: ['', Validators.required]
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
}
