import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'loginNotificacion',
  templateUrl: 'loginNotificacion.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class loginNotificacionComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  cadenas: any = [];
  formUser:User ={
    id: null,
    dni: null,
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
    rol:null,
  };

  errorUsername: boolean;
  errorPassword: boolean;

  durationInSeconds = 4;

  loginService:LoginService;

  constructor(usersService:LoginService, private router : Router, private _snackBar: MatSnackBar) { 
    this.loginService = usersService;
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(loginNotificacionComponent, {
      duration: this.durationInSeconds * 1000, data: mensaje
    });
  }

  onSubmit(){
    if(this.validar()){
      this.loginService.login(this.formUser.username, this.formUser.password)
      .subscribe(
        response=>{
          console.log(response);
          this.loginService.setLoggedUser(this.formUser.username, response['token'], response['rol'], response['id']);
          this.openSnackBar("Bienvenido "+this.formUser.username);
          if(this.loginService.loggedUser.rol == "administrador"){
            this.router.navigateByUrl("/dashboardHome");
          }else{
            this.router.navigateByUrl("/historial");
          }
          console.log(this.loginService.loggedUser.password);
        },
        error=>{
          this.openSnackBar("Error al Iniciar Sesión, Intentelo de Nuevo");
        }
      );
    }
  }

  validar(): Boolean{
    return (this.validarUsername());
  }

  validarUsername(): Boolean{
    if(this.formUser.username != null){
      var nameRegex = /^[a-zA-Z0-9\-]+$/;
      if(nameRegex.test(this.formUser.username) === true){
        this.errorUsername = false;
        return true;
      }else{
        this.errorUsername = true;
        return false;
      }
    }
  }

  ngOnInit() {
  }

}
