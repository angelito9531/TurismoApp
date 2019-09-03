import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginModel: Login;
  formLogin: FormGroup;
  login: Login;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private storage: Storage,
    private alertController: AlertController,
    private loginService: LoginService,
    private usuarioService: UsuarioService) {

    this.loginModel = new Login();
    this.crearFormLogin();
  }

  ngOnInit() {
    this.validarDatos();
  }

  validarDatos() {
    if (this.loginService.usuarioOnly != null) {
      switch (this.loginService.usuarioOnly.tipo_usuario) {
        case 'admin':
          this.route.navigateByUrl('tabs/tab2');
          break;
        case 'cliente':
          this.route.navigateByUrl('tabs/tab4');
          break;
        case 'superadmin':
          this.route.navigateByUrl('tabs/tab1');
          break;
      }
    }
  }

  iniciar() {
    this.login = this.formLogin.value;
    this.loginService.login(this.login.email, this.login.contrasena)
      .then(res => {
        let usuarioDatos: any;
        this.usuarioService.buscarLogin(this.login.email).subscribe(res => {
          usuarioDatos = res.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            };
          });

          this.loginService.usuarioOnly = usuarioDatos[0];
          this.storage.set("usuario", usuarioDatos[0]);

          switch (usuarioDatos[0].tipo_usuario) {
            case 'admin':
              this.route.navigateByUrl('tabs/tab2');
              break;
            case 'cliente':
              this.route.navigateByUrl('tabs/tab4');
              break;
            case 'superadmin':
              this.route.navigateByUrl('tabs/tab1');
              break;
          }
        });
      }, err => {
        this.mensajeAlerta("Verifique sus datos de acceso.");
      });
  }

  registro() {
    this.route.navigateByUrl('registro');
  }

  recuperar() {
    this.route.navigateByUrl('recuperar');
  }

  crearFormLogin() {
    this.formLogin = this.formBuilder.group({
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
