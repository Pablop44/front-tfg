import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }   from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Consulta } from '../models/Consulta';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  styleUrls: ['./consulta.component.css']
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

  estado: any[] = [
    {"name": "En tiempo", ID: "D1", "value": "en tiempo"},
    {"name": "Realizada", ID: "D2", "value": "realizada"},
    {"name": "Aplazada", ID: "D3", "value": "aplazada"},
    {"name": "Cancelada", ID: "D3", "value": "cancelada"}
    ];
  chosenItem = this.estado[0].value;

  cards;

  constructor(private route : ActivatedRoute,public dialog: MatDialog, consultaService: ConsultaService, private breakpointObserver: BreakpointObserver,
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
          }else if(this.consulta.estado == "en tiempo"){
            this.chosenItem = this.estado[0].value;
          }else if(this.consulta.estado == "aplazada"){
            this.chosenItem = this.estado[2].value;
          }else{
            this.chosenItem = this.estado[3].value;
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
    const dialogRef = this.dialog.open(DialogoAnadirObservaciones, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(response => {
      this.consulta.observaciones = response['observaciones'];
      this.editarConsulta();
    });
  }

  openDialogDiagnostico(): void {
    const dialogRef = this.dialog.open(DialogoAnadirDiagnostico, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(response => {
      this.consulta.diagnostico = response['diagnostico'];
      this.editarConsulta();
    });
  }

  openDialogLugar(): void {
    const dialogRef = this.dialog.open(DialogoAnadirLugar, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(response => {
      this.consulta.lugar = response['lugar'];
      this.editarConsulta();
    });
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
        }
      );
    }
  }


  cambiarEstado(valor){
    this.consulta.estado = valor;
    this.editarConsulta();
  }

}
