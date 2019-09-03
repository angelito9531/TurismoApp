import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperarForm: FormGroup;
  btnVerificacion = false;
  itemVerificacion = false;

  constructor(private route: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertController: AlertController) {
    this.crearFormRecuperar();
  }

  ngOnInit() {
  }

  regresar() {
    this.btnVerificacion = false;
    this.itemVerificacion = false;
    this.route.navigateByUrl('login');
  }

  verificarEmail() {
    this.btnVerificacion = !this.btnVerificacion;
    this.itemVerificacion = !this.itemVerificacion;
    this.loginService.sendPasswordResetEmail(this.recuperarForm.value.email).then(res => {
      this.mensajeAlerta("Por favor verifique su email.");
      this.regresar();
    }, err => {
      this.mensajeAlerta("Este correo no se encuentra registrado. Verifique he intente nuevamente.");
    });
  }

  crearFormRecuperar() {
    this.recuperarForm = this.formBuilder.group({
      email: ['', Validators.required]
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
