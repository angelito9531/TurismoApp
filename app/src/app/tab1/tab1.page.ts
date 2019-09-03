import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  listUsersAdmins:any[] = [];
  userAux:Usuario;
  estado:boolean
  usuario:string;
  contracena:string;
  constructor(
    private userService:UsuarioService
  ) 
  {
    //TODO CONSTRUCTOR
    this.estado=true;
    this.userAux=new Usuario;
    this.userAux.login={usuario:"",contrasena:""};
    this.usuario=this.userAux.login.usuario;
    this.contracena=this.userAux.login.contrasena;
    

  }

  ngOnInit(){
    this.getUsersAdmins();
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

  getUserToSaveInDataBase(){
    this.userAux
    console.log(this.userAux);
  }

}
