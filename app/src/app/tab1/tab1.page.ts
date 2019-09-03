import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  registroForm:FormGroup
  listUsersAdmins:any[] = [];
  userAux:Usuario;
  loginaux:Login
  estado:boolean
  usuario:string;
  contracena:string;
  constructor(
    private userService:UsuarioService,
    private userLogin:LoginService,
    //private formBuilder: FormBuilder,
  ) 
  {
    //TODO CONSTRUCTOR
    this.estado=false;
    this.userAux=new Usuario;
    this.loginaux=new Login;
    this.userAux.email=" ";
    this.contracena=" qwe"
    this.userAux.tipo_usuario="Administrador";
    
    //this.userAux.login={usuario:"",contrasena:""};
    // this.usuario=this.userAux.login.usuario;
    // this.contracena=this.userAux.login.contrasena;
    

  }

  ngOnInit(){
    this.getUsersAdmins();
  }

  initializeVariables(){
    this.estado=false;
    this.userAux;
    // this.loginaux=new Login;
    this.userAux.email="";
    this.contracena=""
    this.userAux.tipo_usuario="Administrador";
  }

  getUsersAdmins()
  {  
    let list:any;
    this.userService.listar().subscribe(res =>{
      list = res.map(e =>{
        return {
          id:e.payload.doc.id,
          ... e.payload.doc.data()
        } as any;
      })

      list.forEach(element => {
        this.listUsersAdmins.push(element);
      });
      console.log(this.listUsersAdmins);
    })
  }

  deleteUserInDataBase(id:string,user:Usuario){
    this.userService.actualizar(id,user).then(data =>{
      if(data != null){
        console.log("datos borrrados");
      }
    })
    console.log(user);

  }

  updateUserInDataBase(user:Usuario){

  }

  enabledToCreateUser(){
    this.estado=true;
  }

  disabledToCreateUser(){
    this.estado=false;
  }

  getUserToSaveInDataBase(){
    // this.loginaux.email=this.userAux.email;
    // if(this.loginaux.contrasena != "" || this.loginaux.email != "")
    //   this.userLogin.register(this.loginaux.email,this.loginaux.contrasena).then((data) =>{
      this.userAux.foto="";
       console.log(this.userAux);
           this.userService.crear(this.userAux).then(data =>{
             this.initializeVariables();
           })
     
        
   //   });
    
  }

  crearFormRegistro() {
    // this.registroForm = this.formBuilder.group({
    //   // nombre: ['', Validators.required],
    //   // apellidos: ['', Validators.required],
    //   // email: ['', Validators.required],
    //   // contrasena: ['', Validators.required]
    // });
  }

}
