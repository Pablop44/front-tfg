import { map } from 'rxjs/operators';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription }   from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import { AsmaService } from 'src/services/asma.service';
import { InformeAsma } from '../models/InformeAsma';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';
import { FichaService } from 'src/services/ficha.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-informe-asma',
  templateUrl: './informe-asma.component.html',
  styleUrls: ['./informe-asma.component.css']
})
export class InformeAsmaComponent implements OnInit {

  loginService: LoginService;
  fichaService: FichaService;
  asmaService: AsmaService;
  userService: UserService;
  sub: Subscription;
  idInformeAsma: String;
  datosInformeAsma: InformeAsma;
  fecha:String;
  idFicha: String;
  cards; 
  idPaciente: String;
  idMedico: String;
  analisis: number;
  analisisString: string;

  constructor(loginService: LoginService, asmaService: AsmaService, private breakpointObserver: BreakpointObserver,
     private route : ActivatedRoute, fichaService: FichaService, private router : Router, userService: UserService) {
    this.loginService = loginService;
    this.asmaService = asmaService;
    this.fichaService = fichaService;
    this.userService = userService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeAsma = params['id'];
      this.informeAsma(this.idInformeAsma);
      this.analisisDeSentimientos(this.idInformeAsma);
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

  analisisDeSentimientos(id){
    if(this.loginService.isLogged){
      this.asmaService.analisisDeSentimientos(id)
      .subscribe(
        response =>{
          this.analisis = response['sentimiento'];
            if(this.analisis < -0.375){
              this.analisisString = "Estado general muy negativo";
            }else if(this.analisis < -0.25 && this.analisis > -0.375){
              this.analisisString = "Estado general negativo";
            }else if(this.analisis < 0.25 && this.analisis > -0.25){
              this.analisisString = "Estado general neutro";
            }else if(this.analisis < 0.625  && this.analisis > 0.25){
              this.analisisString = "Estado general positivo";
            }else{
              this.analisisString = "Estado general muy positivo";
            }
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
          this.idPaciente = response['paciente'];
          this.idMedico = response['medico'];
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
    let nombrePaciente;
    let dniPaciente;
    let nombreMedico;
    let colegiado;
    if(this.loginService.isLogged){
      this.userService.datosUsuario(this.idPaciente)
      .subscribe(
        response =>{
          nombrePaciente = response['nombre']+" "+response['apellidos'];
          dniPaciente = response['dni'];
          this.userService.datosUsuario(this.idMedico)
          .subscribe(
            response2 =>{
              nombreMedico = response2['nombre']+" "+response2['apellidos'];
              colegiado = response2['colegiado'];
              const doc = new jsPDF();
              doc.setFontSize(14);
              doc.text('SSEC',20,20);
              doc.text('Informe de Asma con fecha: '+this.datosInformeAsma.fecha, 20, 30);
              doc.text('Paciente con DNI '+dniPaciente+" y nombre "+nombrePaciente, 20, 40);
              doc.text('Medico con Número de colegiado '+colegiado+" y nombre "+nombreMedico, 20, 50);
              doc.fromHTML(document.getElementById('respuestasCerradas'), 20, 60);
              doc.fromHTML(document.getElementById('respuestasAbierta'), 20, 190);
              doc.save('informeAsma'+this.datosInformeAsma.fecha);
              },
            error => {
              console.log(error);
            }
          );
          },
        error => {
          console.log(error);
        }
      );
    }
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
