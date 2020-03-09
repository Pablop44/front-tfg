import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
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
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FiltroConsulta } from 'src/app/models/FiltroConsulta';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

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
  selector: 'app-ficha-individual',
  templateUrl: './ficha-individual.component.html',
  styleUrls: ['./ficha-individual.component.css'],
  providers: [DialogoAnadirConsulta]
})
export class FichaIndividualComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsulta', 'lugar', 'fecha', 'motivo', 'estado', 'diagnostico', 'observaciones', 'acciones'];

  public dataSource: any;
  ficha : any = [];
  medico: any = [];
  paciente: any = [];
  enfermedades : any = [];
  consultaService: ConsultaService;
  loginService: LoginService;
  userService:UserService;
  fichaService:FichaService;
  sub: Subscription;
  id: number;
  fechaFinal: string;
  horaFinal:string;
  consultas : Consulta[] = [];
  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;
  panelOpenState = false;
  diabetes = "";
  asma = "";
  migranas = "";
  orden = null;
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
    private route : ActivatedRoute,
    loginService:LoginService, userService:UserService, fichaService:FichaService, public dialog: MatDialog,private _snackBar: MatSnackBar) {
      this.consultaService = consultaService;
      this.loginService = loginService;
      this.userService = userService;
      this.fichaService = fichaService;
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
            }
            else if(this.enfermedades[element] == "asma"){
              this.asma = "Asma"
            }
            else{
              this.migranas = "Migrañas";
            }
          }
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
          if(response['diagnostico']  !==  null){
            response['diagnostico'] = "Sí"
          }else{
            response['diagnostico'] = "No"
          }
          if(response['observaciones'] !==  null){
            response['observaciones'] = "Sí"
          }else{
            response['observaciones'] = "No"
          }
          const newConsultaData = new Consulta(response['id'],response['lugar'],response['motivo'], response['fecha'],response['diagnostico'],response['observaciones'], response['medico'], response['paciente'], response['ficha'], response['estado']);
          this.consultas.push(newConsultaData);
          this.dataSource.data = this.consultas;
          this.openSnackBar("Se ha creado la consulta para el paciente "+this.paciente.username+" con fecha: "+response['fecha']);
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

}
