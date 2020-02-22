import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cadenas: any = [];
  formRegistro:User ={
    id: null,
    dni:null,
    username:null,
    password:null,
    email:null,
    nombre:null,
    apellidos:null,
    telefono:null,
    poblacion:null,
    colegiado:null,
    cargo:null,
    especialidad:null,
    cuenta:null,
    rol: null,
  };

  loginNotification:string ="";

  registerService: RegisterService;

  constructor(registerService:RegisterService, private router : Router) { 
    this.registerService = registerService;
  }

  onSubmit(){
    this.registerService.registro(this.formRegistro.dni, this.formRegistro.username, this.formRegistro.password,  this.formRegistro.nombre, this.formRegistro.email, this.formRegistro.apellidos, this.formRegistro.telefono, this.formRegistro.poblacion, this.formRegistro.colegiado)
      .subscribe(
        response=>{
          this.loginNotification = "";
          console.log(response);
          this.router.navigateByUrl("/login");
        },
        error=>{
          console.log(error);
          this.loginNotification = error.error;
        }
      );
  }

  ngOnInit() {
  }

}
