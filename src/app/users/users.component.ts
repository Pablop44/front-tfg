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
  constructor(id, dni, username, email,telefono, nombre, apellidos, estado, colegiado,especialidad){
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
  } 
}

export interface DialogData {
  animal: string;
  name: string;
  id: number;
}

@Component({
  selector: 'dialogoAnadirPaciente',
  templateUrl: 'dialogoAnadirPaciente.html',
})

export class DialogoAnadirPaciente {

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirPaciente>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialogoAnadirMedico',
  templateUrl: 'dialogoAnadirMedico.html',
})
export class DialogoAnadirMedico {

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirMedico>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialogoAnadirAdministrador',
  templateUrl: 'dialogoAnadirAdministrador.html',
})
export class DialogoAnadirAdministrador {

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirAdministrador>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
  users : UserData[] = [];
  administradores : UserData[] = [];
  medicos : UserData[] = [];
  public dataSource: any;
  public dataSource2: any;
  public dataSource3: any;
  public pageSize = 15;
  public pageSize2 = 15;
  public pageSize3 = 15;
  public currentPage = 0;
  public currentPage2 = 0;
  public currentPage3 = 0;
  public totalSizePacientes = 0;
  public totalSizeMedicos = 0;
  public totalSizeAdministradores = 0;

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
  };
    
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
    loginService:LoginService, userService:UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
      this.loginService = loginService;
      this.userService = userService;
    }

    ngOnInit() {   
      this.usuarios(1);
    }

    openSnackBar(mensaje: String) {
      this._snackBar.openFromComponent(notificacionComponent, {
        duration: 4 * 1000, data: mensaje
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogoAnadirPaciente, {
        width: '400px',
        data: {name: "hola", animal: "hola"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openDialog2(): void {
      const dialogMed = this.dialog.open(DialogoAnadirMedico, {
        width: '400px',
        data: {dni: null, username: null, password: null, email: null, nombre: null, apellidos: null, telefono: null, poblacion: null}
      });
  
      dialogMed.afterClosed().subscribe(result => {
        this.formRegistroMedico.id = null;
        this.formRegistroMedico.email = result.email;
        this.formRegistroMedico.username = result.username;
        this.formRegistroMedico.cargo = result.cargo;
        this.formRegistroMedico.dni = result.dni;
        this.formRegistroMedico.apellidos = result.apellidos;
        this.formRegistroMedico.nombre = result.nombre;
        this.formRegistroMedico.password = result.password;
        this.formRegistroMedico.poblacion = result.poblacion;
        this.formRegistroMedico.telefono = result.telefono;
        this.formRegistroMedico.colegiado = result.colegiado;
        this.formRegistroMedico.especialidad = result.especialidad;
        this.registrarMedico();
      });
      
    }

    openDialog3(): void {
      const dialogRef = this.dialog.open(DialogoAnadirAdministrador, {
        width: '400px',
        data: {name: "hola", animal: "hola"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
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
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    applyFilter2(event2: Event) {
      const filterValue = (event2.target as HTMLInputElement).value;
      this.dataSource2.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }
    }

    applyFilter3(event3: Event) {
      console.log(this.dataSource3.paginator);
      const filterValue = (event3.target as HTMLInputElement).value;
      this.dataSource3.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource3.paginator) {
        this.dataSource3.paginator.firstPage();
      }
    }

    public handlePage(e: any) {
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.iterator();
    }

    private iterator() {
      const end = (this.currentPage + 1) * this.pageSize;
      const start = this.currentPage * this.pageSize;
      const part = this.users.slice(start, end);
      this.dataSource.data = part;
    }

    public handlePage2(e2: any) {
      this.currentPage2 = e2.pageIndex;
      this.pageSize2 = e2.pageSize;
      this.iterator2();
    }

    private iterator2() {
      const end = (this.currentPage2 + 1) * this.pageSize2;
      const start = this.currentPage2 * this.pageSize2;
      const part = this.medicos.slice(start, end);
      this.dataSource2.data = part;
      
    }

    public handlePage3(e3: any) {
      this.currentPage3 = e3.pageIndex;
      this.pageSize3 = e3.pageSize;
      this.iterator3();
    }

    private iterator3() {
      const end = (this.currentPage3 + 1) * this.pageSize3;
      const start = this.currentPage3 * this.pageSize3;
      const part = this.administradores.slice(start, end);
      this.dataSource3.data = part;
    }

    eliminarUsuario(user, rol){
      
      this.userService.eliminarUser(user.id)
        .subscribe(
          response =>{console.log(response)
            if(rol == 'medico'){
              this.medicos = this.medicos.filter(u => u !== user);
              this.dataSource2.data = this.dataSource2.data.filter(u => u !== user);
            }else if(rol == 'paciente'){
              this.users = this.users.filter(u => u !== user);
              this.dataSource.data = this.dataSource.data.filter(u => u !== user);
            }else{
              this.administradores = this.administradores.filter(u => u !== user);
              this.dataSource3.data = this.dataSource3.data.filter(u => u !== user);
            }
            this.openSnackBar("Se ha eliminado el usuario: \""+user.username+"\" con rol \""+rol+"\"");
            },
          error => {console.log(error)
            this.openSnackBar("No se ha podido eliminar el usuario:" +user.username);}
        );
      
      }

  usuarios(bandera){
    if(this.loginService.isLogged){
      this.userService.todosUsuarios()
      .subscribe(
        response =>{
          for (let i in response) {
              if (response[i]['rol'] == "paciente") {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.users.push(newUserData);
              }else if(response[i]['rol'] == "medico"){
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.medicos.push(newUserData);
              }else{
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.administradores.push(newUserData);
              } 
          }

          this.dataSource = new MatTableDataSource<UserData>(this.users);
          this.dataSource.data = this.users;
          this.totalSizePacientes = this.users.length;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
          this.dataSource2 = new MatTableDataSource<UserData>(this.medicos);
          this.totalSizeMedicos= this.medicos.length;
          this.dataSource2.data = this.medicos;
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;

          this.dataSource3 = new MatTableDataSource<UserData>(this.administradores);
          this.totalSizeAdministradores = this.administradores.length;
          this.dataSource3.data = this.administradores;
          this.dataSource3.paginator = this.paginator;
          this.dataSource3.sort = this.sort;
          if(bandera == 1){
            this.iterator();
            this.iterator2();
            this.iterator3();
          } 
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  registrarMedico(){
    this.userService.registroMedico(this.formRegistroMedico)
      .subscribe(
        response=>{
          for (let i in response) {
            const newUserData = new UserData(null,response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad'])
            this.medicos.push(newUserData);
            console.log(response[i])
            this.dataSource2 = new MatTableDataSource<UserData>(this.medicos);
            this.dataSource2.paginator = this.paginator;
            this.totalSizeMedicos= this.medicos.length;
            this.dataSource2.sort = this.sort;
            this.iterator2();
            this.openSnackBar("Se ha añadido el usuario: \""+newUserData.username+"\" con rol de Médico");
          }
        },
        error=>{
          this.openSnackBar("No se ha podido añadir el usuario, intentelo");
          console.log(error);
        }
      );
  }
}