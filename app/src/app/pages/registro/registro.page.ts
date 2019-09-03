import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  usuario: Usuario;
  detallesUsuario: any;

  constructor(private route: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private alertController: AlertController) {
    this.crearFormRegistro();
  }

  ngOnInit() {
  }

  regresar() {
    this.crearFormRegistro();
    this.route.navigateByUrl('login');
  }

  registro() {
    if (this.registroForm.valid) {
      this.usuario = this.registroForm.value;
      this.usuario.tipo_usuario = 'cliente';
      this.usuario.foto = 'none';
      this.loginService.register(this.usuario.email, this.registroForm.value.contrasena).then(res => {
        this.loginService.sendEmailVerification().then(res => {
          this.usuarioService.crear(this.usuario);
          this.mensajeAlerta("Registro exitoso, ya puede acceder a la apllicacion.");
          this.regresar();
        }, err => {
          this.mensajeAlerta(err.message);
        });
      }, err => {
        this.mensajeAlerta("Debe ingresar un email valido");
      });
    } else {
      console.log("verifique sus datos");
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
      header: 'App',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
