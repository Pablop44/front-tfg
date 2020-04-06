import { map } from 'rxjs/operators';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import { AsmaService } from 'src/services/asma.service';
import { InformeAsma } from '../models/InformeAsma';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-informe-asma',
  templateUrl: './informe-asma.component.html',
  styleUrls: ['./informe-asma.component.css']
})
export class InformeAsmaComponent implements OnInit {

  loginService: LoginService;
  asmaService: AsmaService;
  sub: Subscription;
  idInformeAsma: String;
  datosInformeAsma: InformeAsma;
  fecha:String;
  idFicha: String;

  cards; 

  constructor(loginService: LoginService, asmaService: AsmaService, private breakpointObserver: BreakpointObserver, private route : ActivatedRoute) {
    this.loginService = loginService;
    this.asmaService = asmaService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeAsma = params['id'];
      this.informeAsma(this.idInformeAsma);
      });
  }

  informeAsma(id){
    if(this.loginService.isLogged){
      this.asmaService.informeAsma(id)
      .subscribe(
        response =>{
          this.idFicha = response['ficha'];
          this.fecha = response['fecha'];
          this.datosInformeAsma = new InformeAsma(response['id'],response['fecha'],response['calidadSueno'], response['dificultadRespirar'],
          response['tos'], response['gravedadTos'], response['limitaciones'], response['silbidos'], response['usoMedicacion'],
          response['espirometria'], response['factoresCrisis'], response['estadoGeneral']);
          console.log(this.datosInformeAsma);
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
    doc.save('informeAsma'+this.datosInformeAsma.fecha);
  }

  generateCSVInforme(){
    const options = { 
      filename: 'informeAsma'+this.datosInformeAsma.fecha,
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Informe Asma con Fecha: '+this.datosInformeAsma.fecha,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    var data = [
      this.datosInformeAsma
    ];
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

}
