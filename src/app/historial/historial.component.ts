import { Component, OnInit, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { Ficha } from 'src/app/models/Ficha';
import {MatTableDataSource} from '@angular/material/table';
import { FiltroHistorial } from 'src/app/models/FiltroHistorial';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'dialogoEliminarHistorial',
  templateUrl: 'dialogoEliminarHistorial.html',
})
export class DialogoEliminarHistorial {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarHistorial>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'notificacionEliminarHistorial',
  templateUrl: 'notificacionEliminarHistorial.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionEliminarHistorial {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  fichaService:FichaService;
  loginService: LoginService;
  userService: UserService;
  fichasArray : Ficha[] = [];

  filtroHistorial : FiltroHistorial = {
    id:null,
    fechaInicio:null,
    fechaFin:null,
    dniPaciente:null,
    nombrePaciente:null,
    apellidosPaciente:null,
    dniMedico:null,
    nombreMedico:null,
    apellidosMedico:null,
    colegiado:null,
    migranas:null,
    diabetes:null,
    asma:null
  }

  public dataSource: any;

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  orden:null;


  displayedColumns: string[] = [];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
        ];
      }

      return [
        { title: 'Fichas', cols: 2, rows: 3, cuerpo: "hola"},
      ];
    })
  );

  constructor(fichaService:FichaService, private breakpointObserver: BreakpointObserver, loginService: LoginService,
    private _snackBar: MatSnackBar, userService:UserService,public dialog: MatDialog) {
    this.fichaService = fichaService;
    this.loginService = loginService;
    this.userService = userService;
   }

  ngOnInit() {
    if(this.loginService.loggedUser.rol == 'administrador' && this.loginService.isLogged){
      this.displayedColumns = ['numero', 'fecha', 'dniPaciente', 'nombrePaciente', 'dniMedico', 'nombreMedico', 'colegiado', 'acciones'];
      this.fichas();
      this.numeroFichas();
    }else if(this.loginService.loggedUser.rol == 'medico' && this.loginService.isLogged){
      this.displayedColumns = ['numero', 'fecha', 'dniPaciente', 'nombrePaciente', 'acciones'];
      this.fichasMedico();
      this.numeroFichas();
    }
  }


  fichas(){
    if(this.loginService.isLogged){
      this.fichaService.todasFichas(this.currentPage, this.pageSize, this.orden, this.filtroHistorial)
      .subscribe(
        response =>{
          this.fichasArray = [];
          console.log(response)
          for (let i in response) {
              if(response[i]['enfermedad'] == 'migranas'){
                response[i]['enfermedad'] = "Migrañas";
              }else if(response[i]['enfermedad'] == 'diabetes'){
                response[i]['enfermedad'] = "Diabetes";
              }else{
                response[i]['enfermedad'] = "Asma";
              }
              const newFicha = new Ficha(response[i]['id'],response[i]['fechaCreacion'],response[i]['dniPaciente'], response[i]['nombrePaciente'], response[i]['dniMedico'],response[i]['nombreMedico'], response[i]['colegiado'], response[i]['enfermedad']);
                this.fichasArray.push(newFicha);
          }
          this.dataSource = new MatTableDataSource<Ficha>(this.fichasArray);
          this.dataSource.data = this.fichasArray;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  fichasMedico(){
    if(this.loginService.isLogged){
      this.fichaService.fichasMedico(this.currentPage, this.pageSize, this.orden, this.filtroHistorial)
      .subscribe(
        response =>{
          this.fichasArray = [];
          for (let i in response) {
              if(response[i]['enfermedad'] == 'migranas'){
                response[i]['enfermedad'] = "Migrañas";
              }else if(response[i]['enfermedad'] == 'diabetes'){
                response[i]['enfermedad'] = "Diabetes";
              }else{
                response[i]['enfermedad'] = "Asma";
              }
                const newFicha = new Ficha(response[i]['id'],response[i]['fechaCreacion'],response[i]['dniPaciente'], response[i]['nombrePaciente'], response[i]['dniMedico'],response[i]['nombreMedico'], response[i]['colegiado'], response[i]['enfermedad']);
                this.fichasArray.push(newFicha);
          }
          this.dataSource = new MatTableDataSource<Ficha>(this.fichasArray);
          this.dataSource.data = this.fichasArray;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    if(this.loginService.loggedUser.rol == 'administrador' && this.loginService.isLogged){
      this.fichas();
    }else if(this.loginService.loggedUser.rol == 'medico' && this.loginService.isLogged){
    }
  }

  numeroFichas(){
      
    this.fichaService.numeroFichas()
      .subscribe(
        response =>{
            this.totalSize = response['numero'];
          },
        error => {
          console.log(error)
        }
      );
    }

  aplicarFiltro(){

    if(this.filtroHistorial.fechaInicio != null){
      this.filtroHistorial.fechaInicio = moment(this.filtroHistorial.fechaInicio).format('YYYY-MM-DD');
    }

    if(this.filtroHistorial.fechaFin != null){
      this.filtroHistorial.fechaFin = moment(this.filtroHistorial.fechaFin).format('YYYY-MM-DD');
    }

    if(this.loginService.loggedUser.rol == "administrador"){
      this.fichas();
    }else{
      this.fichasMedico();
    }
   
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogoEliminarHistorial, {
      width: '300px',
      data: {id: data.id}
    });

    dialogRef.afterClosed().subscribe(response => {
      this.eliminarHistorial(data.id);
    });
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionEliminarHistorial, {
      duration: 4 * 1000, data: mensaje
    });
  }

  eliminarHistorial(id){
    this.fichaService.eliminarFicha(id)
      .subscribe(
        response =>{
            this.fichas();
            this.openSnackBar("Se ha eliminado correctamente el historial "+response['id']);
          },
        error => {
          console.log(error);
          this.fichas();
          this.openSnackBar("No se ha eliminado correctamente el historial "+id);
        }
      );
  }

  ordenar(tipo){
    if(this.loginService.isLogged){   
      this.orden = tipo;
      if(this.loginService.loggedUser.rol == "administrador"){
        this.fichas();
      }else{
        this.fichasMedico();
      }
      
    }
  }

}
