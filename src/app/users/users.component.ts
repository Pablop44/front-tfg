import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/models/User';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';


@Component({
  selector: 'notificacion',
  templateUrl: 'notificacion.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

export class UserData {
    id: number;
    dni: string;
    username: string;
    email: string;
    telefono: string;
    nombre:string;
    apellidos:string;
    estado:string;
    colegiado:string;
    especialidad: string;
    rol:string;
  constructor(id, dni, username, email,telefono, nombre, apellidos, estado, colegiado,especialidad, rol){
    this.id = id;
    this.dni = dni;
    this.username = username;
    this.email = email;
    this.telefono = telefono;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.estado = estado;
    this.colegiado = colegiado;
    this.especialidad = especialidad
    this.rol = rol;
  } 
}


@Component({
  selector: 'dialogoAceptarUsuario',
  templateUrl: 'dialogoAceptarUsuario.html',
})

export class DialogoAceptarUsuario {

  constructor(
    public dialogRef: MatDialogRef<DialogoAceptarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoEliminarUsuario',
  templateUrl: 'dialogoEliminarUsuario.html',
})
export class DialogoEliminarUsuario {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loginService: LoginService;
  userService:UserService;
  pacientes : UserData[] = [];
  administradores : UserData[] = [];
  medicos : UserData[] = [];

  public dataSourcePacientes: any;
  public dataSourceMedicos: any;
  public dataSourceAdministradores: any;
  public dataSource4: any;

  public pageSizeAdministrador= 15;
  public currentPageAdministrador = 0;
  public totalSizeAdministrador = 0;

  public pageSizeMedico= 15;
  public currentPageMedico = 0;
  public totalSizeMedico = 0;

  public pageSizePaciente = 15;
  public currentPagePaciente = 0;
  public totalSizePaciente = 0;

  public ordenAdministador = null;
  public ordenMedico = null;
  public ordenPaciente = null;

  panelOpenState = false;
  peticiones: any;
  usuariosActivos:UserData[] = [];
  appComponent:AppComponent;

  formRegistroMedico:User ={
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
    rol:null,
  };


  displayedColumns4: string[] = ['dni', 'nombre', 'email', 'telefono','rol','acciones'];
  displayedColumns: string[] = ['dni', 'nombre', 'email', 'telefono', 'estado','acciones'];
  displayedColumns2: string[] = ['colegiado', 'dni', 'nombre', 'email', 'especialidad', 'telefono', 'estado',  'acciones'];
  displayedColumns3: string[] = ['dni', 'nombre', 'email', 'telefono', 'estado', 'acciones'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Usuarios', cols: 2, rows: 3}
        ];
      }

      return [
        { title: 'Usuarios', cols: 2, rows: 3},
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, consultaService:ConsultaService,
    private router : Router,
    loginService:LoginService, userService:UserService, public dialog: MatDialog, private _snackBar: MatSnackBar,
    appComponent: AppComponent) {
      this.appComponent = appComponent;
      this.loginService = loginService;
      this.userService = userService;
    }

    ngOnInit() {   
      this.getAdministradores();
      this.getMedicos();
      this.getPacientes();
      this.peticionesAutorizar();
    }

    openSnackBar(mensaje: String) {
      this._snackBar.openFromComponent(notificacionComponent, {
        duration: 4 * 1000, data: mensaje
      });
    }

    peticionesAutorizar(){
      if(this.loginService.isLogged){
        this.userService.peticionesAutorizar()
        .subscribe(
          response =>{
            this.peticiones = response;
            if(this.peticiones > 0){
              this.usuariosAutorizar();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    usuariosAutorizar(){
      if(this.loginService.isLogged){
        this.userService.usuariosAutorizar()
        .subscribe(
          response =>{
            this.usuariosActivos = [];
            console.log(response);
            for (let i in response) {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad'],  response[i]['rol']);
                this.usuariosActivos.push(newUserData);
            } 

          this.dataSource4 = new MatTableDataSource<UserData>(this.usuariosActivos);
          this.dataSource4.data = this.usuariosActivos;
          console.log(this.usuariosActivos);
          },
          error => {
            console.log(error);
          }
        );
      }
    }


    openDialog4(user:UserData, rol): void {
      const dialogRef = this.dialog.open(DialogoEliminarUsuario, {
        width: '400px',
        data: {name: user.username, rol: rol, id: user.id, respuesta: "Si"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result.respuesta == "Si"){
          this.eliminarUsuario(user, rol);
        }
      });
    }

    openDialog5(user:UserData, rol): void {
      const dialogRef = this.dialog.open(DialogoAceptarUsuario, {
        width: '400px',
        data: {name: user.username, rol: rol, id: user.id, respuesta: "Si"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result.respuesta == "Si"){
          this.autorizarUsuario(user, rol);
        }
      });
    }

    public handlePageAdministrador(e: any) {
      this.currentPageAdministrador = e.pageIndex;
      this.pageSizeAdministrador = e.pageSize;
      this.getAdministradores();
    }

    public handlePageMedico(e: any) {
      this.currentPageMedico = e.pageIndex;
      this.pageSizeMedico = e.pageSize;
      this.getMedicos();
    }
    public handlePagePaciente(e: any) {
      this.currentPagePaciente = e.pageIndex;
      this.pageSizePaciente = e.pageSize;
      this.getPacientes();
    }


  eliminarUsuario(user, rol){
    this.userService.eliminarUser(user.id)
      .subscribe(
        response =>{console.log(response)
          if(rol == 'medico'){
            this.getMedicos();
          }else if(rol == 'paciente'){
            this.getPacientes();
          }else{
            this.getAdministradores();
          }
          this.openSnackBar("Se ha eliminado el usuario: \""+user.username+"\" con rol \""+rol+"\"");
          this.peticionesAutorizar();
          this.appComponent.peticionesAutorizar();
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el usuario:" +user.username);}
      );
    }

  getAdministradores(){
    if(this.loginService.isLogged){
      this.userService.getAdministradores(this.currentPageAdministrador, this.pageSizeAdministrador, this.ordenAdministador)
      .subscribe(
        response =>{
          for (let i in response) {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad'], response[i]['rol']);
                this.administradores.push(newUserData);
          }
          this.dataSourceAdministradores = new MatTableDataSource<UserData>(this.administradores);
          this.dataSourceAdministradores.data = this.administradores;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getMedicos(){
    if(this.loginService.isLogged){
      this.userService.getMedicos(this.currentPageMedico, this.pageSizeMedico, this.ordenMedico)
      .subscribe(
        response =>{
          this.medicos = [];
          for (let i in response) {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad'], response[i]['rol']);
                this.medicos.push(newUserData);
          }
          this.dataSourceMedicos = new MatTableDataSource<UserData>(this.medicos);
          this.dataSourceMedicos.data = this.medicos;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getPacientes(){
    if(this.loginService.isLogged){
      this.userService.getPacientes(this.currentPagePaciente, this.pageSizePaciente, this.ordenPaciente)
      .subscribe(
        response =>{
          this.pacientes = [];
          for (let i in response) {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad'], response[i]['rol']);
                this.pacientes.push(newUserData);
          }
          this.dataSourcePacientes = new MatTableDataSource<UserData>(this.pacientes);
          this.dataSourcePacientes.data = this.pacientes;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  autorizarUsuario(user, rol){
    this.userService.autorizarUser(user.id)
      .subscribe(
        response =>{console.log(response)
          this.peticionesAutorizar();
          this.appComponent.peticionesAutorizar();
          this.openSnackBar("Se ha aceptado el usuario: \""+user.username+"\" con rol \""+rol+"\"");
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el usuario:" +user.username);}
      );
    
    }
}