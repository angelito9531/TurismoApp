import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  registroForm:FormGroup
  listUsersAdmins:any[] = [];
  userAux:Usuario;
  loginaux:Login;
  estado:boolean;
  usuario:string;
  contracena:string;
  id:string;
  estadoUpdate:boolean;
  constructor(
    private userService:UsuarioService,
    private userLogin:LoginService,
    private alertController: AlertController
    //private formBuilder: FormBuilder,
  ) 
  {
    //TODO CONSTRUCTOR
    this.initializeVariables();
  

  }

  ngOnInit(){
    this.getUsersAdmins();
  }

  initializeVariables(){
    this.estado=false;
    this.estadoUpdate=false;
    this.userAux;
    // this.loginaux=new Login;
    this.loginaux={email:"",contrasena:""};    
    this.userAux={email:"",nombre:"",apellidos:"",tipo_usuario:"",foto:""};
    this.contracena=""
    this.userAux.tipo_usuario="administrador";
  }

  async presentAlertConfirm(id:string) {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: '<strong>Esta seguro de eliminar el dato?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteUserInDataBase(id);
          }
        }
      ]
    });

    await alert.present();
  }


  getUsersAdmins()
  {  
    this.listUsersAdmins=[]
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

  deleteUserInDataBase(id:string){
    this.userService.eliminar(id).then(data =>{
     
        this.getUsersAdmins();
     
    })
    console.log(id);
  }

  updateUserInDataBase(){       
   
      this.userService.actualizar(this.id,this.userAux).then(data =>{
        this.initializeVariables();
        this.getUsersAdmins()
      });
  }

  goToUpdateStep(user:any){
    this.estado=true;
    this.id=user.id;
    this.userAux=user;
    this.estadoUpdate=true;
    
    console.log(this.id);
    console.log(this.userAux);
  }

  enabledToCreateUser(){
    this.estado=true;
  }

  disabledToCreateUser(){
    this.estado=false;
    this.initializeVariables();
  }

  getUserToSaveInDataBase(){
     this.loginaux.email=this.userAux.email;
     if(this.loginaux.contrasena != "" || this.loginaux.email != "")
       this.userLogin.register(this.loginaux.email,this.loginaux.contrasena).then((data) =>{
      this.userAux.foto="";
       console.log(this.userAux);
           this.userService.crear(this.userAux).then(data =>{
             this.initializeVariables();
             this.getUsersAdmins()
           })
     
        
     });
    
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
