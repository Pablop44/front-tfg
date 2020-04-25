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

  errorDni: boolean;
  errorUsername: boolean;
  errorPoblacion: boolean;
  errorPassword: boolean;
  errorNombre: boolean;
  errorColegiado: boolean;
  errorTelefono: boolean;
  errorEmail: boolean;
  errorApellidos: Boolean;

  loginNotification:string ="";

  registerService: RegisterService;

  constructor(registerService:RegisterService, private router : Router) { 
    this.registerService = registerService;
  }

  onSubmit(){
    if(this.validar()){
      this.registerService.registro(this.formRegistro.dni, this.formRegistro.username, this.formRegistro.password,  this.formRegistro.nombre, this.formRegistro.email, this.formRegistro.apellidos, this.formRegistro.telefono, this.formRegistro.poblacion, this.formRegistro.colegiado)
      .subscribe(
        response=>{
          this.loginNotification = "";
          console.log(response);
          this.router.navigateByUrl("/intructionsActivate");
        },
        error=>{
          console.log(error);
          this.loginNotification = error.error;
        }
      );
    } 
  }

  ngOnInit() {

  }

  validar(): Boolean{
    return (this.validarDni() && this.validarUsername() && 
    this.validarPoblacion() && this.validarPassword() && this.validarNombre() &&
    this.validarColegiado() && this.validarTelefono() && this.validarEmail()
    && this.validarApellidos());
  }

  validarDni(): Boolean{
    if(this.formRegistro.dni != null){
      var numero, letra1, letra;
      var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
  
      var dni = this.formRegistro.dni.toUpperCase();
  
      if(expresion_regular_dni.test(dni) === true){
          numero = dni.substr(0,dni.length-1);
          numero = numero.replace('X', 0);
          numero = numero.replace('Y', 1);
          numero = numero.replace('Z', 2);
          letra1 = dni.substr(dni.length-1, 1);
          numero = numero % 23;
          letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
          letra = letra.substring(numero, numero+1);
          if (letra != letra1) {
              this.errorDni = true;
              return false;
          }else{
              this.errorDni = false;
              return true;
          }
      }else{
          this.errorDni = true;
          return false;
      }
    }
    
  }


  validarUsername(): Boolean{
    if(this.formRegistro.username != null){
      var nameRegex = /^[a-zA-Z0-9\-]+$/;
      if(nameRegex.test(this.formRegistro.username) === true){
        this.errorUsername = false;
        return true;
      }else{
        this.errorUsername = true;
        return false;
      }
    }
  }

  validarEmail(): Boolean{
    if(this.formRegistro.email != null){
      var nameRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if(nameRegex.test(this.formRegistro.email) === true){
        this.errorEmail = false;
        return true;
      }else{
        this.errorEmail = true;
        return false;
      }
    }
  }

  validarApellidos(): Boolean{
    if(this.formRegistro.apellidos != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.formRegistro.apellidos) === true){
        this.errorApellidos = false;
        return true;
      }else{
        this.errorApellidos = true;
        return false;
      }
    }
  }

  validarPoblacion(): Boolean{
    if(this.formRegistro.poblacion != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.formRegistro.poblacion) === true){
        this.errorPoblacion = false;
        return true;
      }else{
        this.errorPoblacion = true;
        return false;
      }
    }
  }


  validarPassword(): Boolean{
    if(this.formRegistro.password != null){
      var nameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{1,30}$/;
      if(nameRegex.test(this.formRegistro.password) === true){
        this.errorPassword = false;
        return true;
      }else{
        this.errorPassword = true;
        return false;
      }
    }
  }

  validarTelefono(): Boolean{
    if(this.formRegistro.telefono != null){
      var nameRegex = /^([9,7,6]{1})+([0-9]{8})$/;
      if(nameRegex.test(this.formRegistro.telefono) === true){
        this.errorTelefono= false;
        return true;
      }else{
        this.errorTelefono = true;
        return false;
      }
    }
  }

  validarNombre(): Boolean{
    if(this.formRegistro.nombre != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.formRegistro.nombre) === true){
        this.errorNombre = false;
        return true;
      }else{
        this.errorNombre = true;
        return false;
      }
    }
  }

  validarColegiado(): Boolean{
    if(this.formRegistro.colegiado != null){
      var nameRegex = /^([0-9\-]){9}$/;
      if(nameRegex.test(this.formRegistro.colegiado.toString()) === true){
        this.errorColegiado = false;
        return true;
      }else{
        this.errorColegiado = true;
        return false;
      }
    }
  }

}
