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

@Component({
  selector: 'notificacionVistaUser',
  templateUrl: 'notificacionVistaUser.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionVistaUserComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

class Medico {
  nombre: string;
  id: string;
  constructor(nombre, id){
    this.nombre = nombre;
    this.id = id;
  }
}
export interface DialogData {
  animal: string;
  name: string;
  id: number;
}

@Component({
  selector: 'dialogoEliminarUsuarioVista',
  templateUrl: 'dialogoEliminarUsuarioVista.html',
})
export class DialogoEliminarUsuarioVista {
  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarUsuarioVista>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
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

  cards;

  

  constructor(private breakpointObserver: BreakpointObserver,private _snackBar: MatSnackBar,private router : Router, public dialog: MatDialog, private route : ActivatedRoute,loginService:LoginService, userService:UserService) { 
    this.loginService = loginService;
    this.userService = userService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     this.id = params['id'];
     this.datosUsuario(this.id);
     });

    this.todosMedicos();
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
          this.makeCards();
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
          for (let i in response) {
            this.medico.push(new Medico(response[i]['username'], response[i]['id']));
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  makeCards(){
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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
  
        if(this.datosUser.rol == 'medico')
        var obj = [
          { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
          { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'especialidad', cols: 1, rows: 1, cuerpo: "hola"}
        ];
        if(this.datosUser.rol == 'paciente'){
          var obj = [
            { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
          ];
        }
        if(this.datosUser.rol == 'administrador'){
          var obj = [
            { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
          ];
        }
        
  
        return obj;
      })
    );
  }

  openDialog(datosUser, rol): void {
    const dialogRef = this.dialog.open(DialogoEliminarUsuarioVista, {
      width: '400px',
      data: {name: datosUser.username, rol: rol, id: datosUser.id, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.respuesta == "Si"){
        this.eliminarUsuario(datosUser.id, datosUser.rol, datosUser.username);
      }
    });
  }

  eliminarUsuario(id, rol, username){
      
    this.userService.eliminarUser(id)
      .subscribe(
        response =>{console.log(response)
          this.openSnackBar("Se ha eliminado el usuario: \""+username+"\" con rol \""+rol+"\"");
          this.router.navigateByUrl("/dashboardHome");
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el usuario:" +username);}
      );
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionVistaUserComponent, {
      duration: 4 * 1000, data: mensaje
    });
  }

}
