import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { DiabetesService } from 'src/services/diabetes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription }   from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { InformeDiabetes } from '../models/InformeDiabetes';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';
import { FichaService } from 'src/services/ficha.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-informe-diabetes',
  templateUrl: './informe-diabetes.component.html',
  styleUrls: ['./informe-diabetes.component.css']
})
export class InformeDiabetesComponent implements OnInit {

  loginService: LoginService;
  diabetesService: DiabetesService;
  userService: UserService;
  fichaService: FichaService
  sub: Subscription;
  idInformeDiabetes: String;
  datosInformeDiabetes: InformeDiabetes;
  fecha: String;
  idFicha:string;
  idPaciente: String;
  idMedico: String;
  analisis: number;
  analisisString: string;

  cards;

  constructor(loginService: LoginService, private breakpointObserver: BreakpointObserver, diabetesService: DiabetesService,
     private route : ActivatedRoute, fichaService: FichaService, private router : Router, userService: UserService) {
    this.loginService = loginService;
    this.diabetesService = diabetesService;
    this.fichaService = fichaService;
    this.userService = userService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeDiabetes = params['id'];
      this.informeDiabetes(this.idInformeDiabetes);
      this.analisisDeSentimientos(this.idInformeDiabetes);
      });
  }

  informeDiabetes(id){
    if(this.loginService.isLogged){
      this.diabetesService.informeDiabetes(id)
      .subscribe(
        response =>{
          response['momentos'].forEach(element => {
            if(element['momento'] == "AntesComida"){
              element['momento'] = "Antes de la comida";
            }else if(element['momento'] == "DespuesComida"){
              element['momento'] = "Después de la comida";
            }else if(element['momento'] == "PadecerEpisodio"){
              element['momento'] = "Al padecer un episodio";
            }else if(element['momento'] == "Levantarse"){
              element['momento'] = "Al levantarse";
            }else if(element['momento'] == "Dormir"){
              element['momento'] = "Al irse a dormir";
            }
          }
          );
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
      this.diabetesService.analisisDeSentimientos(id)
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
              doc.text('Informe de Diabetes con fecha: '+this.datosInformeDiabetes.fecha, 20, 30);
              doc.text('Paciente con DNI '+dniPaciente+" y nombre "+nombrePaciente, 20, 40);
              doc.text('Medico con Número de colegiado '+colegiado+" y nombre "+nombreMedico, 20, 50);
              doc.fromHTML(document.getElementById('respuestasCerradas'), 20, 60);
              doc.fromHTML(document.getElementById('respuestasAbierta'), 20, 190);
              doc.save('informeDiabetes'+this.datosInformeDiabetes.fecha);
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
