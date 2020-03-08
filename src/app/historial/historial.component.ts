import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { Ficha } from 'src/app/models/Ficha';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  fichaService:FichaService;
  loginService: LoginService;
  userService: UserService;
  fichasArray : Ficha[] = [];

  public dataSource: any;

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  displayedColumns: string[] = ['numero', 'fecha', 'enfermedad', 'dniPaciente', 'nombrePaciente', 'dniMedico', 'nombreMedico', 'colegiado', 'acciones'];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
        ];
      }

      return [
        { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
      ];
    })
  );

  constructor(fichaService:FichaService, private breakpointObserver: BreakpointObserver, loginService: LoginService, userService:UserService) {
    this.fichaService = fichaService;
    this.loginService = loginService;
    this.userService = userService;
   }

  ngOnInit() {
    if(this.loginService.loggedUser.rol == 'administrador' && this.loginService.isLogged){
      this.fichas();
      this.numeroFichas();
    }else if(this.loginService.loggedUser.rol == 'medico' && this.loginService.isLogged){
    }
    
  }


  fichas(){
    if(this.loginService.isLogged){
      this.fichaService.todasFichas(this.currentPage, this.pageSize, null, null)
      .subscribe(
        response =>{
          this.fichasArray = [];
          console.log(response)
          for (let i in response) {
              if(response[i]['enfermedad'] == 'migranas'){
                response[i]['enfermedad'] = "Migrañas";
              }else if(response[i]['enfermedad'] == 'diabetes'){
                response[i]['enfermedad'] = "Diabetes";
              }else{
                response[i]['enfermedad'] = "Asma";
              }
              const newFicha = new Ficha(response[i]['id'],response[i]['fechaCreacion'],response[i]['dniPaciente'], response[i]['nombrePaciente'], response[i]['dniMedico'],response[i]['nombreMedico'], response[i]['colegiado'], response[i]['enfermedad']);
                this.fichasArray.push(newFicha);
          }
          this.dataSource = new MatTableDataSource<Ficha>(this.fichasArray);
          this.dataSource.data = this.fichasArray;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  fichasMedico(){
    if(this.loginService.isLogged){
      this.fichaService.fichasMedico()
      .subscribe(
        response =>{
          this.fichasArray = [];
          for (let i in response) {
              if(response[i]['enfermedad'] == 'migranas'){
                response[i]['enfermedad'] = "Migrañas";
              }else if(response[i]['enfermedad'] == 'diabetes'){
                response[i]['enfermedad'] = "Diabetes";
              }else{
                response[i]['enfermedad'] = "Asma";
              }
                const newFicha = new Ficha(response[i]['id'],response[i]['fechaCreacion'],response[i]['dniPaciente'], response[i]['nombrePaciente'], response[i]['dniMedico'],response[i]['nombreMedico'], response[i]['colegiado'], response[i]['enfermedad']);
                this.fichasArray.push(newFicha);
          }
          this.dataSource = new MatTableDataSource<Ficha>(this.fichasArray);
          this.dataSource.data = this.fichasArray;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    if(this.loginService.loggedUser.rol == 'administrador' && this.loginService.isLogged){
      this.fichas();
    }else if(this.loginService.loggedUser.rol == 'medico' && this.loginService.isLogged){
    }
  }

  numeroFichas(){
      
    this.fichaService.numeroFichas()
      .subscribe(
        response =>{
            this.totalSize = response['numero'];
          },
        error => {
          console.log(error)
        }
      );
    }

}
