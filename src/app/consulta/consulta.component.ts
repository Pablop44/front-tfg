import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }   from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Consulta } from '../models/Consulta';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Hora } from 'src/app/models/Hora';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA, MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';

const moment = _rollupMoment || _moment;

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

@Component({
  selector: 'notificacionAplazarConsulta',
  templateUrl: 'notificacionAplazarConsulta.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionComponentAplazarConsulta {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

@Component({
  selector: 'dialogoAnadirConsultaConsulta',
  templateUrl: 'dialogoAnadirConsultaConsulta.html',
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class DialogoAnadirConsultaConsulta {

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
    public dialogRef: MatDialogRef<DialogoAnadirConsultaConsulta>,
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
  selector: 'dialogoAnadirObservaciones',
  templateUrl: 'dialogoAnadirObservaciones.html',
})
export class DialogoAnadirObservaciones{

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirObservaciones>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoConfirmacionCambioEstado.html',
  templateUrl: 'dialogoConfirmacionCambioEstado.html',
})
export class DialogoCambiarEstado{

  constructor(
    public dialogRef: MatDialogRef<DialogoCambiarEstado>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoAnadirDiagnostico',
  templateUrl: 'dialogoAnadirDiagnostico.html',
})
export class DialogoAnadirDiagnostico{

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirDiagnostico>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoAnadirLugar',
  templateUrl: 'dialogoAnadirLugar.html',
})
export class DialogoAnadirLugar{

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirLugar>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [DialogoAnadirConsultaConsulta]
})
export class ConsultaComponent implements OnInit {

  consultaService: ConsultaService;
  loginService: LoginService;
  sub: Subscription;
  idConsulta: String;
  idFicha: string;
  fecha: string;
  consulta: Consulta
  horaFecha: any;
  disabled = false;

  estado: any[] = [
    {"name": "En tiempo", ID: "D1", "value": "en tiempo"},
    {"name": "Realizada", ID: "D2", "value": "realizada"},
    {"name": "Aplazada", ID: "D3", "value": "aplazada"},
    {"name": "Cancelada", ID: "D3", "value": "cancelada"}
    ];
  chosenItem = this.estado[0].value;

  cards;

  constructor(private route : ActivatedRoute,public dialog: MatDialog, private _snackBar: MatSnackBar, consultaService: ConsultaService, private breakpointObserver: BreakpointObserver,
     loginService: LoginService, private router: Router) { 
    this.consultaService = consultaService;
    this.loginService = loginService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idConsulta = params['id'];
      this.getDatosConsulta();
      });
  }

  getDatosConsulta(){
    if(this.loginService.isLogged){
      this.consultaService.getDatosConsulta(this.idConsulta)
      .subscribe(
        response =>{
          this.idFicha = response['ficha'];
          this.fecha = response['fecha'];
          this.consultaService.medico = response['medico'];
          this.horaFecha = this.fecha.split(' ');
          this.consulta = new Consulta(response['id'],response['lugar'],response['motivo'], response['fecha'],response['diagnostico'],response['observaciones'], response['medico'], response['paciente'],
          response['ficha'], response['estado']);
          if(this.loginService.loggedUser.rol == 'medico'){
            if(this.loginService.loggedUser.id != response['medico']){
              this.router.navigateByUrl("/dashboardMedico");
            }
          }
          if(this.consulta.estado == "realizada"){
            this.chosenItem = this.estado[1].value;
            this.disabled = true;
          }else if(this.consulta.estado == "en tiempo"){
            this.chosenItem = this.estado[0].value;
            this.disabled = false;
          }else if(this.consulta.estado == "aplazada"){
            this.chosenItem = this.estado[2].value;
            this.disabled = true;
          }else{
            this.chosenItem = this.estado[3].value;
            this.disabled = true;
          }
          this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(({ matches }) => {
              if (matches) {
                return [
                  { title: 'datosConsulta', cols: 2, rows: 2, cuerpo: "hola"}
                ];
              } 
        
              return [
                { title: 'datosConsulta', cols: 1, rows: 2, cuerpo: "hola"},
                { title: 'diagnostico', cols: 1, rows: 1, cuerpo: "hola"},
                { title: 'observaciones', cols: 1, rows: 1, cuerpo: "hola"},
                { title: 'cambioEstado', cols: 1, rows: 1, cuerpo: "hola"},
                { title: 'lugar', cols: 1, rows: 1, cuerpo: "hola"}
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

  openDialogObservaciones(): void {
    if(!this.disabled){
      const dialogRef = this.dialog.open(DialogoAnadirObservaciones, {
        width: '500px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(response => {
        if(response != undefined){
          this.consulta.observaciones = response['observaciones'];
          this.editarConsulta();
        }
      });
    }else{
      this.openSnackBar("La consulta ya ha sido cerrada");
    }
  }

  openDialogDiagnostico(): void {
    if(!this.disabled){
      const dialogRef = this.dialog.open(DialogoAnadirDiagnostico, {
        width: '500px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(response => {
        if(response != undefined){
          this.consulta.diagnostico = response['diagnostico'];
          this.editarConsulta();
        }
      });
    }else{
      this.openSnackBar("La consulta ya ha sido cerrada");
    }
  }

  openDialogLugar(): void {
    if(!this.disabled){
      const dialogRef = this.dialog.open(DialogoAnadirLugar, {
        width: '500px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(response => {
        if(response != undefined){
          this.consulta.lugar = response['lugar'];
          this.editarConsulta();
        }
      });
    }else{
      this.openSnackBar("La consulta ya ha sido cerrada");
    }
  }

  editarConsulta(){
    if(this.loginService.isLogged){
      delete this.consulta["fecha"];
      this.consultaService.editarConsulta(this.consulta)
      .subscribe(
        response =>{
         console.log(response);
         this.getDatosConsulta();
        },
        error => {
          console.log(error);
          this.getDatosConsulta();
        }
      );
    }
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionComponentAplazarConsulta, {
      duration: 4 * 1000, data: mensaje
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoAnadirConsultaConsulta, {
      width: '1000px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response != undefined){
        if(this.validarConsulta(response)){
          this.crearConsulta(response);
        }
      }else{
        this.getDatosConsulta();
      }
    });
  }

  validarConsulta(response): Boolean{
    return (this.validarFecha(response) && this.validarLugar(response) && 
    this.validarMotivo(response) && this.validarHora(response));
  }

  validarFecha(response): Boolean{
    if(response.fecha != null){
      return true;
    }else{
        this.openSnackBar("Es necesario introducir una fecha");
        return false;
    }
  }

  validarLugar(response): Boolean{
    if(response.lugar != null){
      return true;
    }else{
        this.openSnackBar("Es necesario introducir un lugar");
        return false;
    }
  }

  validarMotivo(response): Boolean{
    if(response.motivo != null){
      return true;
    }else{
        this.openSnackBar("Es necesario introducir un motivo");
        return false;
    }
  }

  validarHora(response): Boolean{
    if(response.hora != null){
      return true;
    }else{
        this.openSnackBar("Es necesario introducir una hora");
        return false;
    }
  }

  crearConsulta(respuesta){

    respuesta['fecha'] =  respuesta['fecha']+" "+respuesta['hora']+":00";
    respuesta['diagnostico'] = null;
    respuesta['observaciones'] = null;
    respuesta['medico'] = this.consulta.medico;
    respuesta['paciente'] = this.consulta.paciente;
    respuesta['ficha'] = this.consulta.ficha;
    respuesta['estado'] = "en tiempo";
    delete respuesta["hora"];
    
    if(this.loginService.isLogged){
      this.consultaService.crearConsulta(respuesta)
      .subscribe(
        response =>{
          this.editarConsulta();
          this.openSnackBar("Se ha cambiado el estado de la consulta y se ha creado una nueva");
          this.router.navigateByUrl("/consulta/"+response['id']);
        },
        error => {
          console.log(error);
          this.openSnackBar("No se ha podido cambiar el estado");
        }
      );
    }
  }

  openDialogCambiarEstado(valor){
    if(!this.disabled){
      const dialogRef = this.dialog.open(DialogoCambiarEstado, {
        width: '400px',
        data: {respuesta : "Si"}
      });
      dialogRef.afterClosed().subscribe(response => {
        if(response != undefined){
          this.cambiarEstado(valor);
        }else{
          this.getDatosConsulta();
        }
      });
    }else{
      this.openSnackBar("Ya no se puede cambiar el estado de la consulta");
    }
  }


  cambiarEstado(valor){
    this.consulta.estado = valor;
    if(valor == "aplazada"){
      this.openDialog();
    }else{
      this.editarConsulta();
    }
  }

}
