import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

class Medico {
  nombre: string;
  id: string;
  constructor(nombre, id){
    this.nombre = nombre;
    this.id = id;
  }
}

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {
  id: string;
  sub: Subscription;
  loginService: LoginService;
  userService: UserService;
  datosUser: any = [];

  medico: Medico[] = [];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Usuario', cols: 1, rows: 2, cuerpo: "hola"},
          { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
        ];
      }

      return [
        { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
        { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
        { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
        { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
        { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
        { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
        
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private route : ActivatedRoute,loginService:LoginService, userService:UserService) { 
    this.loginService = loginService;
    this.userService = userService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     this.id = params['id'];
     this.datosUsuario(this.id);
     });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  datosUsuario(username){
    if(this.loginService.isLogged){
      this.userService.datosUsuario(username)
      .subscribe(
        response =>{
          this.datosUser = response;
          console.log(this.datosUser);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  todosMedicos(){
    if(this.loginService.isLogged){
      this.userService.todosMedicos()
      .subscribe(
        response =>{
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  

}
