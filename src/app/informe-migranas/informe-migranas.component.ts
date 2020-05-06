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
import { UserService } from 'src/services/user.service';

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
  userService: UserService;
  datosInformeMigranas: InformeMigranas;
  fecha: string;
  idFicha : number;
  cards;
  idPaciente: String;
  idMedico: String;

  constructor(loginService: LoginService, private breakpointObserver: BreakpointObserver, migranasService: MigranasService,
     private route : ActivatedRoute, fichaService: FichaService, private router: Router, userService: UserService) {
    this.loginService = loginService;
    this.migranasService = migranasService;
    this.fichaService = fichaService;
    this.userService = userService;
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
          response['factores'].forEach(element => {
            if(element['factores'] == "Estres"){
              element['factores'] = "Estrés";
            }else if(element['factores'] == "EjercicioFisico"){
              element['factores'] = "Ejercicio Físico";
            }else if(element['factores'] == "FactoresHormonales"){
              element['factores'] = "Factores Hormonales";
            }else if(element['factores'] == "Dietas_alcohol"){
              element['factores'] = "Diestas / Alcohol";
            }else if(element['factores'] == "MovimientoCefalicos"){
              element['factores'] = "Movimiento Cefálicos";
            }else if(element['factores'] == "CambiosAtmosferico"){
              element['factores'] = "Cambios Atmosféricos";
            }else if(element['factores'] == "CambiosPosturales"){
              element['factores'] = "Cambios Posturales";
            }else if(element['factores'] == "ManiobrasValsalva"){
              element['factores'] = "Maniobras Valsalva";
            }
          }
          );

          response['sintomas'].forEach(element => {
            if(element['sintomas'] == "Nauseas_Vomitos"){
              element['sintomas'] = "Nauseas / Vómitos";
            }else if(element['sintomas'] == "Sono_foto_osmofobia"){
              element['sintomas'] = "Sono / Foto / Osmofobia";
            }else if(element['sintomas'] == "Fotopsias_escotomas_hemianopsia_diplopia"){
              element['sintomas'] = "Fotopsias / Escotomas / Hemianopsia / Diplopía";
            }else if(element['sintomas'] == "Hemiparesia_hemidisestesia"){
              element['sintomas'] = "Hemiparesia / Hemidisestesia";
            }else if(element['sintomas'] == "Inestabilidad_vertigo"){
              element['sintomas'] = "Inestabilidad / Vertigo";
            }else if(element['sintomas'] == "SintomasDisautonomicos"){
              element['sintomas'] = "Síntomas Disautonómicos";
            }else if(element['sintomas'] == "Afasia"){
              element['sintomas'] = "Afasia";
            }else if(element['sintomas'] == "Confusion_crisisComiciales_fiebre"){
              element['sintomas'] = "Confusión / Crisis Comiciales / Fiebre";
            }
          }
          );
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
              doc.text('Informe de Migrañas con fecha: '+this.datosInformeMigranas.fecha, 20, 30);
              doc.text('Paciente con DNI '+dniPaciente+" y nombre "+nombrePaciente, 20, 40);
              doc.text('Medico con Número de colegiado '+colegiado+" y nombre "+nombreMedico, 20, 50);
              doc.fromHTML(document.getElementById('respuestasCerradas'), 20, 60);
              doc.fromHTML(document.getElementById('respuestasAbierta'), 20, 200);
              doc.save('informeMigranas'+this.datosInformeMigranas.fecha);
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
