import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/models/User';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export class Hora {
  hora: string;
  estado: Boolean;
  constructor(hora, estado){
    this.hora = hora;
    this.estado = estado;
  }
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

export interface DialogData {
  animal: string;
  name: string;
  id: number;
}

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
  constructor(id, lugar, motivo, fecha,diagnostico, observaciones, medico, paciente, ficha, estado){
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

  consultaService: ConsultaService;
  loginService: LoginService;

  constructor(
    consultaService: ConsultaService,
    loginService: LoginService,
    public dialogRef: MatDialogRef<DialogoAnadirConsulta>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.consultaService = consultaService;
      this.loginService = loginService;
      this.dataSource = ELEMENT_DATA;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getHoras(type: string, event: MatDatepickerInputEvent<Date>) {
  
  (<HTMLInputElement>document.getElementById('fecha')).value = moment(event.value).format('DD-MM-YYYY');
   
    if(this.loginService.isLogged){
      this.consultaService.getHoras(moment(event.value).format('YYYY-MM-DD'))
      .subscribe(
        response =>{
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
          console.log(this.horas);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  horaElegida(hora){
    console.log(hora);
  }

}

@Component({
  selector: 'app-ficha-individual',
  templateUrl: './ficha-individual.component.html',
  styleUrls: ['./ficha-individual.component.css']
})
export class FichaIndividualComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsulta', 'lugar', 'fecha', 'motivo', 'estado', 'diagnostico', 'observaciones', 'acciones'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public dataSource: any;
  ficha : any = [];
  medico: any = [];
  paciente: any = [];
  consultaService: ConsultaService;
  loginService: LoginService;
  userService:UserService;
  fichaService:FichaService;
  sub: Subscription;
  id: number;
  consultas : Consulta[] = [];
  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Datos del Historial', cols: 2, rows: 1, cuerpo: "hola"},
          { title: 'Datos del Médico', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
          { title: 'Datos del Paciente', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
          { title: 'Consultas', cols: 2, rows: 2, cuerpo: 'cuerpo3' }
        ];
      }

      return [
        { title: 'Datos del Historial', cols: 2, rows: 1, cuerpo: "hola"},
        { title: 'Datos del Médico', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
        { title: 'Datos del Paciente', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
        { title: 'Consultas', cols: 2, rows: 3, cuerpo: 'cuerpo3' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, consultaService:ConsultaService,
    private route : ActivatedRoute,
    loginService:LoginService, userService:UserService, fichaService:FichaService, public dialog: MatDialog) {
      this.consultaService = consultaService;
      this.loginService = loginService;
      this.userService = userService;
      this.fichaService = fichaService;
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       console.log(this.id);
       this.datosFicha(this.id);
       });

    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    public handlePage(e: any) {
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.iterator();
    }

    private iterator() {
      const end = (this.currentPage + 1) * this.pageSize;
      const start = this.currentPage * this.pageSize;
      const part = this.consultas.slice(start, end);
      this.dataSource.data = part;
    }

    datosPaciente(idUser){
    if(this.loginService.isLogged){
      this.userService.datosUsuario(idUser)
      .subscribe(
        response =>{
          this.paciente = response;
          console.log(response);
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
          console.log(response);
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
          console.log(response);
          this.ficha = response;
          this.datosMedico(response['medico']);
          this.datosPaciente(response['paciente']);
          this.datosConsultas(idFicha);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  datosConsultas(idFicha){
    if(this.loginService.isLogged){
      this.consultaService.consultasFicha(idFicha)
      .subscribe(
        response =>{
          console.log(response);
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
          this.totalSize = this.consultas.length;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
          this.iterator();

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
      data: {name: "hola", animal: "hola"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
