import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Consulta } from '../ficha-individual/ficha-individual.component';
import {MatTableDataSource} from '@angular/material/table';
import { FiltroConsulta } from '../models/FiltroConsulta';

@Component({
  selector: 'app-historial-consulta',
  templateUrl: './historial-consulta.component.html',
  styleUrls: ['./historial-consulta.component.css']
})
export class HistorialConsultaComponent implements OnInit {

  consultaService: ConsultaService;
  loginService: LoginService;
  dataSource: any;
  consultasHoy: Consulta[] = [];

  dataSourceConsultasMedico: any;
  consultasMedico: Consulta[] = [];

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  public pageSizeHistorial = 15;
  public currentPageHistorial = 0;
  public totalSizeHistorial = 0;


  orden = null;
  ordenHistorial = null;

  filtroConsulta: FiltroConsulta = {
    id: null,
    lugar: null,
    fechaFin: null,
    fechaInicio: null,
    diagnostico: null,
    observaciones: null,
    tiempo:null,
    cancelada: null,
    aplazada: null,
    realizada: null
  }


  displayedColumns = ['lugar', 'motivo', 'fecha', 'paciente', 'acciones'];


  constructor(consultaService: ConsultaService, private breakpointObserver: BreakpointObserver, loginService: LoginService) {
    this.consultaService = consultaService;
    this.loginService = loginService;
   }

   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'consultas', cols: 2, rows: 3, cuerpo: "hola"},
        ];
      }

      return [
        { title: 'consultas', cols: 2, rows: 3, cuerpo: "hola"},
      ];
    })
  );

  ngOnInit() {
    if(this.loginService.loggedUser.rol == "administrador"){
      this.getHistorial();
    }else{
      this.getConsultasHoy();
      this.getHistorialMedico();
    }
  }

  getConsultasHoy(){
    if(this.loginService.isLogged){
      this.consultaService.getConsultasHoy(this.loginService.loggedUser.id)
      .subscribe(
        response =>{
          this.consultasHoy = [];
          for (let i in response) {
              if(response[i]['diagnostico']  !==  null){
                response[i]['diagnostico'] = "Sí"
              }else{
                response[i]['diagnostico'] = "No"
              }
              if(response[i]['observaciones'] !==  null){
                response[i]['observaciones'] = "Sí"
              }else{
                response[i]['observaciones'] = "No"
              }
              const newConsultaData = new Consulta(response[i]['id'],response[i]['lugar'],response[i]['motivo'], response[i]['fecha'],response[i]['diagnostico'],response[i]['observaciones'], response[i]['medico'], response[i]['paciente'], response[i]['ficha'], response[i]['estado']);
              this.consultasHoy.push(newConsultaData);
            } 

          this.dataSource = new MatTableDataSource<Consulta>(this.consultasHoy);
          this.dataSource.data = this.consultasHoy;
          console.log(this.dataSource.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getHistorialMedico(){
    this.consultaService.consultasMedico(this.loginService.loggedUser.id, this.currentPage, this.pageSize, this.orden, this.filtroConsulta)
      .subscribe(
        response =>{
          this.numeroConsultasMedico(this.loginService.loggedUser.id, this.filtroConsulta);
          this.consultasMedico = [];
          for (let i in response) {
              if(response[i]['diagnostico']  !==  null){
                response[i]['diagnostico'] = "Sí"
              }else{
                response[i]['diagnostico'] = "No"
              }
              if(response[i]['observaciones'] !==  null){
                response[i]['observaciones'] = "Sí"
              }else{
                response[i]['observaciones'] = "No"
              }
              const newConsultaData = new Consulta(response[i]['id'],response[i]['lugar'],response[i]['motivo'], response[i]['fecha'],response[i]['diagnostico'],response[i]['observaciones'], response[i]['medico'], response[i]['paciente'], response[i]['ficha'], response[i]['estado']);
              this.consultasMedico.push(newConsultaData);
            } 

          this.dataSourceConsultasMedico = new MatTableDataSource<Consulta>(this.consultasMedico);
          this.dataSourceConsultasMedico.data = this.consultasMedico;
          this.filtroConsulta.aplazada = null;
          this.filtroConsulta.cancelada = null;
          this.filtroConsulta.diagnostico = null;
          this.filtroConsulta.id = null;
          this.filtroConsulta.lugar = null;
          this.filtroConsulta.fechaFin = null;
          this.filtroConsulta.fechaInicio = null;
          this.filtroConsulta.realizada = null,
          this.filtroConsulta.tiempo = null;

          console.log(response);

          },
        error => {
          console.log(error);
        }
      );
    }

    numeroConsultasMedico(id, filtro){
      if(this.loginService.isLogged){
        this.consultaService.numeroConsultasMedico(id, filtro)
        .subscribe(
          response =>{
            this.totalSize = response['numero'];
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  getHistorial(){

  }

}
