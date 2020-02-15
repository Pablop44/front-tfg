import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

export class Ficha {
  fechaCreacion: string;
  dniPaciente: string;
  nombrePaciente: string;
  dniMedico: string;
  nombreMedico: string;
  colegiado: string;
  enfermedad: string
  constructor(fechaCreacion, dniPaciente, nombrePaciente,dniMedico, nombreMedico, colegiado, enfermedad){
    this.fechaCreacion = fechaCreacion;
    this.dniPaciente = dniPaciente;
    this.nombrePaciente = nombrePaciente;
    this.dniMedico = dniMedico;
    this.nombreMedico = nombreMedico;
    this.colegiado = colegiado;
    this.enfermedad = enfermedad;
  } 
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashboardHomeComponent {
  dataSource;
  columnsToDisplay = ['dniPaciente', 'dniMedico', 'enfermedad', 'fechaCreacion'];
  expandedElement: Ficha | null;
  fichasArray : Ficha[] = [];
  todasConsultas: any = [];
  todosUsuarios: any = [];
  consultaService: ConsultaService;
  loginService: LoginService;
  userService:UserService;
  fichaService:FichaService;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
          { title: 'Consultas', cols: 1, rows: 1, cuerpo: this.todasConsultas},
          { title: 'Usuarios', cols: 1, rows: 1, cuerpo: this.todosUsuarios },
          { title: 'Medicamentos', cols: 1, rows: 1, cuerpo: 'cuerpo3' },
        ];
      }

      return [
        { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
        { title: 'Consultas', cols: 1, rows: 2, cuerpo: this.todasConsultas },
        { title: 'Usuarios', cols: 1, rows: 2, cuerpo: this.todosUsuarios },
        { title: 'Medicamentos', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, consultaService:ConsultaService,
    private router : Router,
    loginService:LoginService, userService:UserService, fichaService:FichaService) {
      this.consultaService = consultaService;
      this.loginService = loginService;
      this.userService = userService;
      this.fichaService = fichaService;
    }

  ngOnInit() {
    if(this.loginService.isLogged){
      this.consultas();
      this.usuarios();
      this.fichas()
    }else{
      this.router.navigateByUrl("/login");
    }
  }
  
  consultas(){
    if(this.loginService.isLogged){
      this.consultaService.todasConsultas()
      .subscribe(
        response =>{
          console.log(response);
          this.todasConsultas = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  usuarios(){
    if(this.loginService.isLogged){
      this.userService.todosUsuarios()
      .subscribe(
        response =>{
          console.log(response);
          this.todosUsuarios = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  fichas(){
    if(this.loginService.isLogged){
      this.fichaService.todasFichas()
      .subscribe(
        response =>{
          console.log(response);
          for (let i in response) {
              if(response[i]['enfermedad'] == 'migranas'){
                response[i]['enfermedad'] = "Migrañas";
              }else if(response[i]['enfermedad'] == 'diabetes'){
                response[i]['enfermedad'] = "Diabetes";
              }else{
                response[i]['enfermedad'] = "Asma";
              }
                const newFicha = new Ficha(response[i]['fechaCreacion'],response[i]['dniPaciente'], response[i]['nombrePaciente'],response[i]['dniMedico'],response[i]['nombreMedico'], response[i]['colegiado'], response[i]['enfermedad']);
                this.fichasArray.push(newFicha);
          }
          this.dataSource = this.fichasArray;
          console.log(this.fichasArray);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}


  

  


