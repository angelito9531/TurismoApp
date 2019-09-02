import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder, ) {
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
  }

  crearFormRecuperar() {
    this.recuperarForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}
