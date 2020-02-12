import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export class UserData {
    dni: string;
    username: string;
    email: string;
    telefono: string;
    nombre:string;
    apellidos:string;
    estado:string;
    colegiado:string;
    especialidad: string;
  constructor(dni, username, email,telefono, nombre, apellidos, estado, colegiado,especialidad){
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
  public pageSize = 10;
  public pageSize2 = 10;
  public pageSize3 = 10;
  public currentPage = 0;
  public currentPage2 = 0;
  public currentPage3 = 0;
  public totalSizePacientes = 0;
  public totalSizeMedicos = 0;
  public totalSizeAdministradores = 0;
    
  displayedColumns: string[] = ['dni', 'nombre', 'email', 'telefono', 'estado','acciones'];
  displayedColumns2: string[] = ['colegiado', 'dni', 'nombre', 'email', 'especialidad', 'telefono', 'estado',  'acciones'];
  displayedColumns3: string[] = ['dni', 'nombre', 'email', 'telefono', 'estado', 'acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


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
    loginService:LoginService, userService:UserService) {
      this.loginService = loginService;
      this.userService = userService;
    }

    ngOnInit() {   
      this.usuarios();
    }
  
    applyFilter(event: Event) {
      console.log(this.dataSource);
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    applyFilter2(event: Event) {
      console.log(this.dataSource2);
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource2.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }
    }

    applyFilter3(event: Event) {
      console.log(this.dataSource3);
      const filterValue = (event.target as HTMLInputElement).value;
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
      this.dataSource = part;
    }

    public handlePage2(e: any) {
      this.currentPage2 = e.pageIndex2;
      this.pageSize2 = e.pageSize2;
      this.iterator2();
    }

    private iterator2() {
      const end = (this.currentPage2 + 1) * this.pageSize2;
      const start = this.currentPage2 * this.pageSize2;
      const part = this.medicos.slice(start, end);
      this.dataSource2 = part;
    }

    public handlePage3(e: any) {
      this.currentPage3 = e.pageIndex3;
      this.pageSize3 = e.pageSize3;
      this.iterator3();
    }

    private iterator3() {
      const end = (this.currentPage3 + 1) * this.pageSize3;
      const start = this.currentPage3 * this.pageSize3;
      const part = this.administradores.slice(start, end);
      this.dataSource3 = part;
    }

  usuarios(){
    if(this.loginService.isLogged){
      this.userService.todosUsuarios()
      .subscribe(
        response =>{
          console.log(response);
          for (let i in response) {
              if (response[i]['rol'] == "paciente") {
                const newUserData = new UserData(response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.users.push(newUserData);
              }else if(response[i]['rol'] == "medico"){
                const newUserData = new UserData(response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.medicos.push(newUserData);
              }else{
                const newUserData = new UserData(response[i]['dni'],response[i]['username'], response[i]['email'],response[i]['telefono'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado'], response[i]['colegiado'], response[i]['especialidad']);
                this.administradores.push(newUserData);
              }

            console.log(this.users);
            this.dataSource = new MatTableDataSource<UserData>(this.users);
            this.dataSource.paginator = this.paginator;
            this.totalSizePacientes = this.users.length;
            this.dataSource.sort = this.sort;

            this.dataSource2 = new MatTableDataSource<UserData>(this.medicos);
            this.dataSource2.paginator = this.paginator;
            this.totalSizeMedicos= this.medicos.length;
            this.dataSource2.sort = this.sort;

            this.dataSource3 = new MatTableDataSource<UserData>(this.administradores);
            this.dataSource3.paginator = this.paginator;
            this.totalSizeAdministradores = this.administradores.length;
            this.dataSource3.sort = this.sort;
          }
          console.log(this.dataSource);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}