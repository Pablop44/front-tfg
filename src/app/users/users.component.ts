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
    id: number;
    dni: string;
    username: string;
    email: string;
    nombre:string;
    apellidos:string;
    estado:string;
  constructor(id, dni, username, email, nombre, apellidos, estado){
    this.id = id
    this.dni = dni;
    this.username = username;
    this.email = email;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.estado = estado;
  }
    
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  todasConsultas: any = [];
  pacientes: any = [];
  loginService: LoginService;
  userService:UserService;
  users : UserData[] = [];
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
    
  displayedColumns: string[] = ['id', 'dni', 'nombre'];

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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
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

  usuarios(){
    if(this.loginService.isLogged){
      this.userService.todosUsuarios()
      .subscribe(
        response =>{
          console.log(response);
          for (let i in response) {
              if (response[i]['rol'] == "paciente") {
                const newUserData = new UserData(response[i]['id'],response[i]['dni'],response[i]['username'], response[i]['id'],response[i]['nombre'], response[i]['apellidos'], response[i]['estado']);
                this.users.push(newUserData);
            }
            console.log(this.users);
            this.dataSource = new MatTableDataSource<UserData>(this.users);
            this.dataSource.paginator = this.paginator;
            this.totalSize = this.users.length;
            this.iterator();
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