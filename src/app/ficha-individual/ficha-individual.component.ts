import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { NotaService } from 'src/services/nota.service';
import { TratamientoService } from 'src/services/tratamiento.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, ViewChild, Inject, ElementRef} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_SNACK_BAR_DATA, MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Hora } from 'src/app/models/Hora';
import { Nota } from 'src/app/models/Nota';
import { FiltroNota } from 'src/app/models/FiltroNota';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FiltroConsulta } from 'src/app/models/FiltroConsulta';
import { InformeDiabetes } from 'src/app/models/InformeDiabetes';
import { InformeAsma } from 'src/app/models/InformeAsma';
import { InformeMigranas } from 'src/app/models/InformeMigranas';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { DiabetesService } from 'src/services/diabetes.service';
import { AsmaService } from 'src/services/asma.service';
import { MigranasService } from 'src/services/migranas.service';
import { FiltroDiabetes } from '../models/filtroDiabetes';
import { FiltroAsma } from '../models/filtroAsma';
import { FiltroMigranas } from '../models/filtroMigranas';
import * as jsPDF from 'jspdf';
import { ExportToCsv } from 'export-to-csv';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'notificacionCrearConsulta',
  templateUrl: 'notificacionCrearConsulta.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionComponentCrearConsulta {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

const ELEMENT_DATA: Hora[] = [
  {hora: "09:00", estado:null},
  {hora: "10:00", estado:null},
  {hora: "11:00", estado:null},
  {hora: "12:00", estado:null},
  {hora: "13:00", estado:null},
  {hora: "14:00", estado:null},
  {hora: "15:00", estado:null},
  {hora: "16:00", estado:null},
];

export class Consulta {
  id: number;
  lugar: string;
  motivo: string;
  fecha: string;
  diagnostico: string;
  observaciones:string;
  medico:string;
  paciente:string;
  ficha:string;
  estado: string;
  constructor(id, lugar, motivo, fecha, diagnostico, observaciones, medico, paciente, ficha, estado){
    this.id = id;
    this.lugar = lugar;
    this.motivo = motivo;
    this.fecha = fecha;
    this.diagnostico = diagnostico;
    this.observaciones = observaciones;
    this.medico = medico;
    this.paciente = paciente;
    this.ficha = ficha;
    this.estado = estado
  } 
}

@Component({
  selector: 'dialogoAnadirConsulta',
  templateUrl: 'dialogoAnadirConsulta.html',
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class DialogoAnadirConsulta {


  displayedColumns: string[] = ['hora'];
  
  horas: Hora[] = [];
  dataSource : Hora[] = [];
  banderaHora : boolean;
  horaFinal : string;
  notificacion : string;
  fechaFinal: string;
  consultaService: ConsultaService;
  loginService: LoginService;

  constructor(
    consultaService: ConsultaService,
    loginService: LoginService,
    public dialogRef: MatDialogRef<DialogoAnadirConsulta>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.consultaService = consultaService;
      this.loginService = loginService;
      this.dataSource = ELEMENT_DATA;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getHoras(type: string, event: MatDatepickerInputEvent<Date>) {

   this.fechaFinal = moment(event.value).format('YYYY-MM-DD');
   this.data.fecha = moment(event.value).format('YYYY-MM-DD');
   (<HTMLInputElement>document.getElementById('fecha')).value = moment(event.value).format('DD-MM-YYYY');
    if(this.loginService.isLogged){
      this.consultaService.getHoras(moment(event.value).format('YYYY-MM-DD'))
      .subscribe(
        response =>{
          this.horas = [];
          this.notificacion = "";
          var newHora = new Hora('09:00',response['09:00']);
          this.horas.push(newHora);
          var newHora = new Hora('10:00',response['10:00']);
          this.horas.push(newHora);
          var newHora = new Hora('11:00',response['11:00']);
          this.horas.push(newHora);
          var newHora = new Hora('12:00',response['12:00']);
          this.horas.push(newHora);
          var newHora = new Hora('13:00',response['13:00']);
          this.horas.push(newHora);
          var newHora = new Hora('14:00',response['14:00']);
          this.horas.push(newHora);
          var newHora = new Hora('15:00',response['15:00']);
          this.horas.push(newHora);
          var newHora = new Hora('16:00',response['16:00']);
          this.horas.push(newHora);
          this.dataSource = this.horas;
          console.log(this.horas);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  horaElegida(hora){
    this.banderaHora = false;
    this.horas.forEach(element => {
      if(element.hora == hora && element.estado == true){
        this.banderaHora = true;
      }
    });
    if(this.banderaHora){
      this.horaFinal = null;
      this.data.hora = null;
      this.notificacion = "Error en la hora elegida";
    }else{
      this.notificacion = "";
      this.data.hora = hora;
      this.horaFinal = hora;
    }
  }
}

@Component({
  selector: 'dialogoAnadirNota',
  templateUrl: 'dialogoAnadirNota.html',
})
export class DialogoAnadirNota{

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirNota>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoEliminarNota',
  templateUrl: 'dialogoEliminarNota.html',
})
export class DialogoEliminarNota{

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarNota>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialogoEditarNota',
  templateUrl: 'dialogoEditarNota.html',
})
export class DialogoEditarNota{

  constructor(
    public dialogRef: MatDialogRef<DialogoEditarNota>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-ficha-individual',
  templateUrl: './ficha-individual.component.html',
  styleUrls: ['./ficha-individual.component.css'],
  providers: [DialogoAnadirConsulta]
})
export class FichaIndividualComponent implements OnInit {

  displayedColumnsNotas : string[] = ['fecha'];

  displayedColumns: string[] = ['numeroConsulta', 'lugar', 'fecha', 'motivo', 'estado', 'diagnostico', 'observaciones', 'acciones'];

  displayedColumnsAsma: string[] = ['fecha', 'limitaciones', 'estadoGeneral', 'acciones'];

  displayedColumnsDiabetes: string[] = ['fecha', 'nivelBajo', 'nivelAlto', 'estadoGeneral', 'acciones'];

  displayedColumnsMigranas: string[] = ['fecha', 'tipoEpisodio', 'intensidad', 'frecuencia', 'estadoGeneral', 'acciones'];

  dataSource: any;
  dataSourceNotas: any;
  dataSourceInformeDiabetes: any;
  dataSourceInformeAsma: any;
  dataSourceInformeMigranas: any;
  ficha : any = [];
  medico: any = [];
  paciente: any = [];
  enfermedades : any = [];
  notas:Nota[] = [];
  informeDiabetes:InformeDiabetes[] = [];
  informeAsma: InformeAsma[] = [];
  informeMigranas: InformeMigranas[] = [];

  consultaService: ConsultaService;
  loginService: LoginService;
  userService:UserService;
  fichaService:FichaService;
  notaService:NotaService;
  tratamientoService:TratamientoService;
  diabetesService: DiabetesService;
  asmaService: AsmaService;
  migranasService: MigranasService;

  sub: Subscription;
  id: number;
  fechaFinal: string;
  horaFinal:string;
  consultas : Consulta[] = [];

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  public pageSizeNotas = 5;
  public currentPageNotas = 0;
  public totalSizeNotas = 0;

  public pageSizeTratamiento = 15;
  public currentPageTratamiento = 0;
  public totalSizeTratamiento = 0;

  public pageSizeDiabetes = 15;
  public currentPageDiabetes = 0;
  public totalSizeDiabetes = 0;

  public pageSizeAsma = 15;
  public currentPageAsma = 0;
  public totalSizeAsma = 0;

  public pageSizeMigranas = 15;
  public currentPageMigranas = 0;
  public totalSizeMigranas = 0;

  panelOpenState = false;
  diabetes = "";
  asma = "";
  migranas = "";
  orden = null;
  ordenNotas = null;
  ordenTratamiento = null;
  ordenDiabetes = null;
  ordenAsma = null;
  ordenMigranas = null;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  controlEstados = new FormControl();
  filteredEstado: Observable<string[]>;
  estado: string[] = [];
  allEstados: string[] = ['En Tiempo', 'Cancelada', 'Aplazada', 'Realizada'];

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

  filtroNota: FiltroNota = {
    fechaInicio: null,
    fechaFin: null,
    texto: null,
  }

  filtroDiabetes: FiltroDiabetes = {
    fecha: null,
    nivelBajo: null,
    nivelAlto: null,
    estadoGeneral: null,
  }

  filtroAsma : FiltroAsma = {
    fecha : null,
    limitaciones: null,
    estadoGeneral: null
  }

  filtroMigranas: FiltroMigranas = {
    fecha: null,
    tipoEpisodio: null,
    intensidad: null,
    frecuencia: null,
    estadoGeneral: null
  }

  @ViewChild('auto',{ static: true }) matAutocomplete: MatAutocomplete;

  tarjetaResumen = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Datos del Historial', cols: 2, rows: 1, cuerpo: "hola"},
        ];
      }

      return [
        { title: 'Datos del Historial', cols: 2, rows: 1, cuerpo: "hola"}
      ];
    })
  );

  tarjetaDatos = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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
    private route : ActivatedRoute, notaService:NotaService,
    loginService:LoginService, userService:UserService, fichaService:FichaService,
     public dialog: MatDialog,private _snackBar: MatSnackBar, tratamientoService:TratamientoService,
     diabetesService: DiabetesService, asmaService: AsmaService, migranasService: MigranasService) {
      this.consultaService = consultaService;
      this.tratamientoService = tratamientoService;
      this.loginService = loginService;
      this.userService = userService;
      this.fichaService = fichaService;
      this.notaService = notaService;
      this.diabetesService = diabetesService;
      this.asmaService = asmaService;
      this.migranasService = migranasService;
      this.filteredEstado = this.controlEstados.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allEstados.slice()));
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.datosFicha(this.id);
       });
    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    public handlePage(e: any) {
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.datosConsultas();
    }

    public handlePageNotas(e: any) {
      this.currentPageNotas = e.pageIndex;
      this.pageSizeNotas = e.pageSize;
      this.datosNotas();
    }

    public handlePageDiabetes(e: any) {
      this.currentPageDiabetes = e.pageIndex;
      this.pageSizeDiabetes = e.pageSize;
      this.datosDiabetes();
    }

    public handlePageAsma(e: any) {
      this.currentPageAsma = e.pageIndex;
      this.pageSizeAsma = e.pageSize;
      this.datosAsma();
    }

    public handlePageMigranas(e: any) {
      this.currentPageMigranas = e.pageIndex;
      this.pageSizeMigranas = e.pageSize;
      this.datosMigranas();
    }

    datosPaciente(idUser){
    if(this.loginService.isLogged){
      this.userService.datosUsuario(idUser)
      .subscribe(
        response =>{
          this.paciente = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosMedico(idUser){
    if(this.loginService.isLogged){
      this.userService.datosUsuario(idUser)
      .subscribe(
        response =>{
          this.medico = response;
          this.consultaService.medico = response['id'];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosFicha(idFicha){
    if(this.loginService.isLogged){
      this.fichaService.datosFicha(idFicha)
      .subscribe(
        response =>{
          
          this.ficha = response;
          this.datosFicha2(idFicha);
          this.datosMedico(response['medico']);
          this.datosPaciente(response['paciente']);
          this.datosConsultas();
          this.datosNotas();
          this.datosTratamientos();

        },
        error => {
          console.log(error);
        }
      );
    }
  }
  datosFicha2(idFicha){
    if(this.loginService.isLogged){
      this.fichaService.datosFicha(idFicha)
      .subscribe(
        response =>{         
          this.enfermedades = response['enfermedad'];
          for(const element in this.enfermedades){
            if(this.enfermedades[element] == "diabetes"){
              this.diabetes = "Diabetes";
              this.datosDiabetes();
            }
            else if(this.enfermedades[element] == "asma"){
              this.asma = "Asma";
              this.datosAsma();
            }
            else{
              this.migranas = "Migrañas";
              this.datosMigranas();
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosNotas(){
    if(this.loginService.isLogged){
      this.notaService.todasNotas(this.id, this.currentPageNotas, this.pageSizeNotas, this.ordenNotas, this.filtroNota)
      .subscribe(
        response =>{       
          this.numeroNotas(this.id, this.filtroNota);
          this.notas = [];  
          for (let i in response) {
            const newNota = new Nota(response[i]['id'],response[i]['fecha'],response[i]['datos'], response[i]['ficha']);
            this.notas.push(newNota);
          } 
          this.dataSourceNotas = new MatTableDataSource<Nota>(this.notas);
          this.dataSourceNotas.data = this.notas;
          this.filtroNota.fechaFin = null;
          this.filtroNota.fechaInicio = null;
          this.filtroNota.texto = null;
          console.log(this.notas);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosDiabetes(){
    if(this.loginService.isLogged){
      this.diabetesService.diabetesFicha(this.id, this.currentPageDiabetes, this.pageSizeDiabetes, this.ordenDiabetes, null)
      .subscribe(
        response =>{       
          this.numeroInformesDiabetes(this.id, null);
          this.informeDiabetes = [];  
          for (let i in response) {
            const newDiabetesInforme = new InformeDiabetes(response[i]['id'],response[i]['fecha'],response[i]['numeroControles'], response[i]['nivelBajo'],
            response[i]['frecuenciaBajo'], response[i]['horarioBajo'], response[i]['perdidaConocimiento'], response[i]['nivelAlto'], response[i]['frecuenciaAlto'],
            response[i]['horarioAlto'], response[i]['actividadFisica'], response[i]['problemaDieta'], response[i]['estadoGeneral'], response[i]['momentos']);
            this.informeDiabetes.push(newDiabetesInforme);
          } 
          this.dataSourceInformeDiabetes = new MatTableDataSource<InformeDiabetes>(this.informeDiabetes);
          this.dataSourceInformeDiabetes.data = this.informeDiabetes;
          this.filtroDiabetes.fecha = null;
          this.filtroDiabetes.nivelAlto = null;
          this.filtroDiabetes.nivelBajo = null;
          this.filtroDiabetes.estadoGeneral = null;
          console.log(this.informeDiabetes);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosAsma(){
    if(this.loginService.isLogged){
      this.asmaService.asmaFicha(this.id, this.currentPageAsma, this.pageSizeAsma, this.ordenAsma, null)
      .subscribe(
        response =>{       
          this.numeroInformesAsma(this.id, null);
          this.informeAsma = [];  
          for (let i in response) {
            const newInformeAsma = new InformeAsma(response[i]['id'],response[i]['fecha'],response[i]['calidadSueno'], response[i]['dificultadRespirar'],
            response[i]['tos'], response[i]['gravedadTos'], response[i]['limitaciones'], response[i]['silbidos'], response[i]['usoMedicacion'],
            response[i]['espirometria'], response[i]['factoresCrisis'], response[i]['estadoGeneral']);
            this.informeAsma.push(newInformeAsma);
          } 
          this.dataSourceInformeAsma = new MatTableDataSource<InformeAsma>(this.informeAsma);
          this.dataSourceInformeAsma.data = this.informeAsma;
          this.filtroAsma.fecha = null;
          this.filtroAsma.limitaciones = null;
          this.filtroAsma.estadoGeneral = null;
          console.log(this.informeAsma);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosMigranas(){
    if(this.loginService.isLogged){
      this.migranasService.migranasFicha(this.id, this.currentPageMigranas, this.pageSizeMigranas, this.ordenMigranas, null)
      .subscribe(
        response =>{       
          this.numeroInformesMigranas(this.id, null);
          this.informeMigranas = [];  
          for (let i in response) {
            const newInformeMigranas = new InformeMigranas(response[i]['id'],response[i]['fecha'],response[i]['frecuencia'], response[i]['duracion'],
            response[i]['horario'], response[i]['finalizacion'], response[i]['tipoEpisodio'], response[i]['intensidad'], response[i]['limitaciones'],
            response[i]['despiertoNoche'], response[i]['estadoGeneral'], response[i]['sintomas'], response[i]['factores']);
            this.informeMigranas.push(newInformeMigranas);
          } 
          this.dataSourceInformeMigranas = new MatTableDataSource<InformeMigranas>(this.informeMigranas);
          this.dataSourceInformeMigranas.data = this.informeMigranas;
          this.filtroMigranas.estadoGeneral = null;
          this.filtroMigranas.fecha = null;
          this.filtroMigranas.frecuencia = null;
          this.filtroMigranas.intensidad = null;
          this.filtroMigranas.tipoEpisodio = null;
          console.log(this.informeMigranas);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosTratamientos(){
    if(this.loginService.isLogged){
      this.tratamientoService.todosTratamientos(this.id, this.currentPageTratamiento, this.pageSizeTratamiento, this.ordenTratamiento, null)
      .subscribe(
        response =>{       
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosConsultas(){
    if(this.loginService.isLogged){
      this.consultaService.consultasFicha(this.id, this.currentPage, this.pageSize, this.orden, this.filtroConsulta)
      .subscribe(
        response =>{
          this.numeroConsultas(this.id, this.filtroConsulta);
          this.consultas = [];
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
              this.consultas.push(newConsultaData);
            } 

          this.dataSource = new MatTableDataSource<Consulta>(this.consultas);
          this.dataSource.data = this.consultas;
          this.filtroConsulta.aplazada = null;
          this.filtroConsulta.cancelada = null;
          this.filtroConsulta.diagnostico = null;
          this.filtroConsulta.id = null;
          this.filtroConsulta.lugar = null;
          this.filtroConsulta.fechaFin = null;
          this.filtroConsulta.fechaInicio = null;
          this.filtroConsulta.realizada = null,
          this.filtroConsulta.tiempo = null;

          console.log(this.consultas);

          },
        error => {
          console.log(error);
        }
      );
    }
  }

  crearConsulta(respuesta){

    respuesta['fecha'] =  respuesta['fecha']+" "+respuesta['hora']+":00";
    respuesta['diagnostico'] = null;
    respuesta['observaciones'] = null;
    respuesta['medico'] = this.medico['id'];
    respuesta['paciente'] = this.paciente['id'];
    respuesta['ficha'] = this.id;
    respuesta['estado'] = "en tiempo";
    delete respuesta["hora"];
    
    if(this.loginService.isLogged){
      this.consultaService.crearConsulta(respuesta)
      .subscribe(
        response =>{
          console.log(response);
          this.datosConsultas();
          this.openSnackBar("Se ha creado la consulta para el paciente "+this.paciente.username+" con fecha: "+response['fecha']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  crearNota(respuesta){
    if(this.loginService.isLogged){
      this.notaService.crearNota(respuesta, this.id, moment().format('YYYY-MM-DD'))
      .subscribe(
        response =>{
          console.log(response);
          this.datosNotas();
          this.openSnackBar("Se ha creado la nota");
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoAnadirConsulta, {
      width: '1000px',
      data: {}
    });


    dialogRef.afterClosed().subscribe(response => {
      this.crearConsulta(response);
    });
  }

  openDialogEliminarNota(nota): void {
    const dialogRef = this.dialog.open(DialogoEliminarNota, {
      width: '300px',
      data: {fecha :nota.fecha, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.respuesta == "Si"){
        this.eliminarNota(nota);
      }
    });
  }

  openDialogEditarNota(nota): void {
    const dialogRef = this.dialog.open(DialogoEditarNota, {
      width: '1000px',
      data: {id :nota.id, fecha:nota.fecha, datos: nota.datos, ficha:nota.ficha}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.editarNota(result);
    });
  }

  openDialogNota(): void {
    const dialogRef = this.dialog.open(DialogoAnadirNota, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(response => {
      this.crearNota(response['texto']);
    });
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionComponentCrearConsulta, {
      duration: 4 * 1000, data: mensaje
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.estado.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.controlEstados.setValue(null);
  }

  remove(estado: string): void {
    this.allEstados.push(estado);
    const index = this.estado.indexOf(estado);
    if (index >= 0) {
      this.estado.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.estado.push(event.option.viewValue);
    this.controlEstados.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allEstados.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  numeroConsultas(id, filtro){
    if(this.loginService.isLogged){
      this.consultaService.numeroConsultas(id, filtro)
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

  numeroNotas(id, filtro){
    if(this.loginService.isLogged){
      this.notaService.numeroNotas(id, filtro)
      .subscribe(
        response =>{         
          this.totalSizeNotas = response['numero'];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  numeroInformesDiabetes(id, filtro){
    if(this.loginService.isLogged){
      this.diabetesService.numeroInformesDiabetes(id, filtro)
      .subscribe(
        response =>{         
          this.totalSizeDiabetes = response['numero'];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  numeroInformesAsma(id, filtro){
    if(this.loginService.isLogged){
      this.asmaService.numeroInformesAsma(id, filtro)
      .subscribe(
        response =>{         
          this.totalSizeAsma = response['numero'];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  numeroInformesMigranas(id, filtro){
    if(this.loginService.isLogged){
      this.migranasService.numeroInformesMigranas(id, filtro)
      .subscribe(
        response =>{         
          this.totalSizeMigranas = response['numero'];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ordenar(tipo){
    if(this.loginService.isLogged){
      this.orden = tipo;
      this.datosConsultas();
    }
  }

  aplicarFiltro(){
    if(this.filtroConsulta.fechaInicio != null){
      this.filtroConsulta.fechaInicio = moment(this.filtroConsulta.fechaInicio).format('YYYY-MM-DD');
    }
    if(this.filtroConsulta.fechaFin != null){
      this.filtroConsulta.fechaFin = moment(this.filtroConsulta.fechaFin).format('YYYY-MM-DD');
    }
    
    if(this.filtroConsulta.diagnostico == 'si'){
      this.filtroConsulta.diagnostico = 'si';
    }else{
      this.filtroConsulta.diagnostico = null;
    }
    if(this.filtroConsulta.observaciones == 'si'){
      this.filtroConsulta.observaciones = 'si';
    }else{
      this.filtroConsulta.observaciones = null;
    }
    this.estado.forEach(element => {
      if(element == "En Tiempo"){
        this.filtroConsulta.tiempo = "si";
      }else if(element == "Cancelada"){
        this.filtroConsulta.cancelada = "si";
      }else if(element == "Aplazada"){
        this.filtroConsulta.aplazada = "si";
      }else if(element == "Realizada"){
        this.filtroConsulta.realizada = "si";
      }
    });
    this.datosConsultas();
  }


  aplicarFiltroNotas(){
    if(this.filtroNota.fechaInicio != null){
      this.filtroNota.fechaInicio = moment(this.filtroNota.fechaInicio).format('YYYY-MM-DD');
    }
    if(this.filtroNota.fechaFin != null){
      this.filtroNota.fechaFin = moment(this.filtroNota.fechaFin).format('YYYY-MM-DD');
    }
    this.datosNotas();
  }

  aplicarFiltroDiabetes(){
    if(this.filtroDiabetes.fecha != null){
      this.filtroDiabetes.fecha = moment(this.filtroDiabetes.fecha).format('YYYY-MM-DD');
    }
    this.datosDiabetes();
  }

  aplicarFiltroAsma(){
    if(this.filtroAsma.fecha != null){
      this.filtroAsma.fecha = moment(this.filtroDiabetes.fecha).format('YYYY-MM-DD');
    }
    this.datosAsma();
  }

  aplicarFiltroMigranas(){
    if(this.filtroMigranas.fecha != null){
      this.filtroMigranas.fecha = moment(this.filtroMigranas.fecha).format('YYYY-MM-DD');
    }

    this.datosMigranas();
  }


  ordenarNota(orden){
    this.ordenNotas = orden;
    this.datosNotas();
  }

  eliminarNota(nota){
    if(this.loginService.isLogged){
      this.notaService.eliminarNota(nota.id)
      .subscribe(
        response =>{
          console.log(response);
          this.datosNotas();
          this.openSnackBar("Se ha eliminado la nota");
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  editarNota(nota){
    if(this.loginService.isLogged){
      this.notaService.editarNota(nota)
      .subscribe(
        response =>{
          console.log(response);
          this.datosNotas();
          this.openSnackBar("Se ha actualizado los datos con éxito");
        },
        error => {
          console.log(error);
          this.openSnackBar("Error al actualizar los datos");
        }
      );
    }
  }

  generarCSVAsma(){
    if(this.loginService.isLogged){
      this.asmaService.todosInformesAsma(this.id, null)
      .subscribe(
        response =>{       
          const informeAsma = [];  
          for (let i in response) {
            const newInformeAsma = new InformeAsma(response[i]['id'],response[i]['fecha'],response[i]['calidadSueno'], response[i]['dificultadRespirar'],
            response[i]['tos'], response[i]['gravedadTos'], response[i]['limitaciones'], response[i]['silbidos'], response[i]['usoMedicacion'],
            response[i]['espirometria'], response[i]['factoresCrisis'], response[i]['estadoGeneral']);
            informeAsma.push(newInformeAsma);
          } 
          const options = { 
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'CSV Informes Asma',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          };
          const csvExporter = new ExportToCsv(options);
          csvExporter.generateCsv(informeAsma);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  generarCSVDiabetes(){
    if(this.loginService.isLogged){
      this.diabetesService.todosInformesDiabetes(this.id, null)
      .subscribe(
        response =>{       
          const informeDiabetes = [];  
          for (let i in response) {
            const newDiabetesInforme = new InformeDiabetes(response[i]['id'],response[i]['fecha'],response[i]['numeroControles'], response[i]['nivelBajo'],
            response[i]['frecuenciaBajo'], response[i]['horarioBajo'], response[i]['perdidaConocimiento'], response[i]['nivelAlto'], response[i]['frecuenciaAlto'],
            response[i]['horarioAlto'], response[i]['actividadFisica'], response[i]['problemaDieta'], response[i]['estadoGeneral'], response[i]['momentos']);
            informeDiabetes.push(newDiabetesInforme);
          } 
          const options = { 
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'CSV Informes Diabetes',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          };
            const csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(informeDiabetes);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  generarCSVMigranas(){
    if(this.loginService.isLogged){
      this.migranasService.todosInformesMigranas(this.id, null)
      .subscribe(
        response =>{       
          const informeMigranas = [];  
          for (let i in response) {
            const newInformeMigranas = new InformeMigranas(response[i]['id'],response[i]['fecha'],response[i]['frecuencia'], response[i]['duracion'],
            response[i]['horario'], response[i]['finalizacion'], response[i]['tipoEpisodio'], response[i]['intensidad'], response[i]['limitaciones'],
            response[i]['despiertoNoche'], response[i]['estadoGeneral'], response[i]['sintomas'], response[i]['factores']);
            informeMigranas.push(newInformeMigranas);
          } 
          const options = { 
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'CSV Informes Asma',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          };
            const csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(informeMigranas);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}