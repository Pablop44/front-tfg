import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { DiabetesService } from 'src/services/diabetes.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { InformeDiabetes } from '../models/InformeDiabetes';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-informe-diabetes',
  templateUrl: './informe-diabetes.component.html',
  styleUrls: ['./informe-diabetes.component.css']
})
export class InformeDiabetesComponent implements OnInit {

  loginService: LoginService;
  diabetesService: DiabetesService;
  sub: Subscription;
  idInformeDiabetes: String;
  datosInformeDiabetes: InformeDiabetes;
  fecha: String;
  idFicha:string;

  cards;

  constructor(loginService: LoginService, private breakpointObserver: BreakpointObserver, diabetesService: DiabetesService, private route : ActivatedRoute) {
    this.loginService = loginService;
    this.diabetesService = diabetesService;
    
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeDiabetes = params['id'];
      this.informeDiabetes(this.idInformeDiabetes);
      });
  }

  informeDiabetes(id){
    if(this.loginService.isLogged){
      this.diabetesService.informeDiabetes(id)
      .subscribe(
        response =>{
          this.fecha = response['fecha'];
          this.idFicha = response['ficha'];
          this.datosInformeDiabetes = new InformeDiabetes(response['id'],response['fecha'],response['numeroControles'], response['nivelBajo'],
          response['frecuenciaBajo'], response['horarioBajo'], response['perdidaConocimiento'], response['nivelAlto'], response['frecuenciaAlto'],
          response['horarioAlto'], response['actividadFisica'], response['problemaDieta'], response['estadoGeneral'], response['momentos']);
          console.log(this.datosInformeDiabetes);
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
    doc.save('informeAsma'+this.datosInformeDiabetes.fecha);
  }

  generateCSVInforme(){
    const options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Informe Diabetes con Fecha: '+this.datosInformeDiabetes.fecha,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    var data = [
      this.datosInformeDiabetes
    ];
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

}
