import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription }   from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { MigranasService } from 'src/services/migranas.service';
import { InformeMigranas } from '../models/InformeMigranas';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';
import { FichaIndividualComponent } from '../ficha-individual/ficha-individual.component';
import { FichaService } from 'src/services/ficha.service';

@Component({
  selector: 'app-informe-migranas',
  templateUrl: './informe-migranas.component.html',
  styleUrls: ['./informe-migranas.component.css']
})
export class InformeMigranasComponent implements OnInit {

  loginService: LoginService;
  migranasService: MigranasService;
  fichaService: FichaService;
  fichaIndividual: FichaIndividualComponent;
  sub: Subscription;
  idInformeMigranas: String;
  datosInformeMigranas: InformeMigranas;
  fecha: string;
  idFicha : number;
  cards;

  constructor(loginService: LoginService, private breakpointObserver: BreakpointObserver, migranasService: MigranasService,
     private route : ActivatedRoute, fichaService: FichaService, private router: Router) {
    this.loginService = loginService;
    this.migranasService = migranasService;
    this.fichaService = fichaService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeMigranas = params['id'];
      this.informeMigranas(this.idInformeMigranas);
      });
  }


  informeMigranas(id){
    if(this.loginService.isLogged){
      this.migranasService.informeMigranas(id)
      .subscribe(
        response =>{
          this.fecha = response['fecha'];
          this.idFicha = response['ficha'];
          this.datosInformeMigranas = new InformeMigranas(response['id'],response['fecha'],response['frecuencia'], response['duracion'],
          response['horario'], response['finalizacion'], response['tipoEpisodio'], response['intensidad'], response['limitaciones'],
          response['despiertoNoche'], response['estadoGeneral'], response['sintomas'], response['factores']);
          console.log(this.datosInformeMigranas);
          this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(({ matches }) => {
              if (matches) {
                return [
                  { title: 'respuestaCerrada', cols: 1, rows: 2, cuerpo: "hola"},
                  { title: 'respuestaAbierta', cols: 1, rows: 2, cuerpo: "hola"}
                ];
              }
        
              return [
                { title: 'respuestaCerrada', cols: 1, rows: 2, cuerpo: "hola"},
                { title: 'respuestaAbierta', cols: 1, rows: 2, cuerpo: "hola"}
              ];
            })
          );
          this.mirarPermiso();
          },
        error => {
          console.log(error);
        }
      );
    }
  }


  mirarPermiso(){
    if(this.loginService.isLogged){
      this.fichaService.datosFicha(this.idFicha)
      .subscribe(
        response =>{
          console.log(response);
            if(this.loginService.loggedUser.rol == 'medico'){
              if(this.loginService.loggedUser.id != response['medico']){
               this.router.navigateByUrl("/dashboardMedico");
              }
            }
          },
        error => {
          console.log(error);
        }
      );
    }
  }


  generatePDFInforme(){
    const doc = new jsPDF();
    doc.fromHTML(document.getElementById('listaInformeAsma'), 10, 10);
    doc.save('informeAsma'+this.datosInformeMigranas.fecha);
  }

  generateCSVInforme(){
    const options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Informe Migrañas con Fecha: '+this.datosInformeMigranas.fecha,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    var data = [
      this.datosInformeMigranas
    ];
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

}
