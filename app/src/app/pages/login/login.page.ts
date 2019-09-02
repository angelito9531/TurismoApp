import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginModel: Login;
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router) {

    this.loginModel = new Login();
    this.crearFormLogin();
  }

  ngOnInit() {
  }

  iniciar() {
    let tipoUsuario = 'admin';
    switch (tipoUsuario) {
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
}
