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
    this.loginService.login(this.formUser.username, this.formUser.password)
      .subscribe(
        response=>{
          var obj = JSON.parse(response);
          this.loginService.setLoggedUser(this.formUser.username, this.formUser.password, obj.rol, obj.id);
          this.openSnackBar("Bienvenido "+this.formUser.username);
          this.router.navigateByUrl("/dashboardHome");
        },
        error=>{
          this.openSnackBar("Error al Iniciar Sesión, Intentelo de Nuevo");
        }
      );
  }



  ngOnInit() {
  }

}
