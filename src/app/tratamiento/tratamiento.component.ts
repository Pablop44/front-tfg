import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }   from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TratamientoService } from 'src/services/tratamiento.service';
import { Tratamiento } from '../models/Tratamiento';
import { Medicamento } from '../medicamentos/medicamentos.component';
import {MatTableDataSource} from '@angular/material/table';
import { MedicamentoService } from 'src/services/medicamento.service';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'notificacionTratamientoMedicamento',
  templateUrl: 'notificacionTratamientoMedicamento.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionTratamientoMedicamento {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

@Component({
  selector: 'dialogoEliminarMedicamentoTratamiento',
  templateUrl: 'dialogoEliminarMedicamentoTratamiento.html',
})
export class DialogoEliminarMedicamentoTratamiento{

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarMedicamentoTratamiento>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoAnadirMedicamentoTratamiento',
  templateUrl: 'dialogoAnadirMedicamentoTratamiento.html',
})
export class DialogoAnadirMedicamentoTratamiento{

  medicamentoService: MedicamentoService;

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirMedicamentoTratamiento>,
    @Inject(MAT_DIALOG_DATA) public data: any, medicamentoService: MedicamentoService) {
      this.medicamentoService = medicamentoService;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buscarMedicamento(){
    this.medicamentoService.buscarMedicamento(this.data.medicamento)
    .subscribe(
      response =>{
          this.data.datosMedicamentos = response[0];
        },
      error => {
        console.log(error);
      }
    );
  }
}



@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  loginService: LoginService;
  tratamientoService: TratamientoService;
  medicamentoService: MedicamentoService;
  sub: Subscription;
  idTratamiento: String;
  tratamiento: Tratamiento;
  idFicha: String;
  enfermedad: String;
  medicamentos: Medicamento[] = [];
  dataSourceMedicamentos: any;
  displayedColumnsMedicamentos: string[] = ['nombre', 'viaAdministracion', 'marca', 'dosis','acciones'];

  public pageSizeMedicamentos = 15;
  public currentPageMedicamentos = 0;
  public totalSizeMedicamentos = 0;


  cards;

  constructor(private route : ActivatedRoute,private _snackBar: MatSnackBar, loginService: LoginService, private breakpointObserver: BreakpointObserver,
     tratamientoService: TratamientoService, public dialog: MatDialog, medicamentoService: MedicamentoService) {
    this.loginService = loginService;
    this.tratamientoService = tratamientoService;
    this.medicamentoService = medicamentoService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idTratamiento = params['id'];
      this.getDatosTratamiento();
      });
  }

  getDatosTratamiento(){
    if(this.loginService.isLogged){
      this.tratamientoService.getDatosTratamiento(this.idTratamiento)
      .subscribe(
        response =>{
          this.idFicha = response['ficha'];
          this.enfermedad = response['enfermedad'];
          this.tratamiento = new Tratamiento(response['id'],response['posologia'],response['fechaInicio'], response['fechaFin'],response['horario'], response['enfermedad'],response['medicamento'], response['ficha']);
          console.log(this.tratamiento);
          this.getDatosMedicamentos(this.tratamiento);
          this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(({ matches }) => {
              if (matches) {
                return [
                  { title: 'datosTratamiento', cols: 2, rows: 2, cuerpo: "hola"}
                ];
              } 
        
              return [
                { title: 'datosTratamiento', cols: 2, rows: 2, cuerpo: "hola"},
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

  getDatosMedicamentos(tratamiento){
    if(tratamiento.medicamentos != undefined){
      this.medicamentos = [];
      this.tratamiento.medicamentos.forEach(element => {
        const newMedicamento = new Medicamento(element['nombre'], element['viaAdministracion'], element['marca'], element['dosis']);
        this.medicamentos.push(newMedicamento);
      });
  
      this.dataSourceMedicamentos = new MatTableDataSource<Medicamento>(this.medicamentos);
      this.dataSourceMedicamentos.data = this.medicamentos;
    }else{
      this.medicamentos = [];
      this.dataSourceMedicamentos = new MatTableDataSource<Medicamento>(this.medicamentos);
      this.dataSourceMedicamentos.data = this.medicamentos;
    }    
  }


  openDialogEliminarMedicamentoTratamiento(medicamento): void {
    const dialogRef = this.dialog.open(DialogoEliminarMedicamentoTratamiento, {
      width: '400px',
      data: {nombre :medicamento.nombre, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.respuesta == "Si"){
        this.eliminarMedicamentoTratamiento(medicamento.nombre);
      }
    });
  }

  eliminarMedicamentoTratamiento(medicamento){
    if(this.loginService.isLogged){
      this.tratamientoService.eliminarTratamientoMedicamento(medicamento, this.idTratamiento)
      .subscribe(
        response =>{
          this.openSnackBar("Se ha eliminado con éxito");
          console.log(response);
          this.getDatosTratamiento();
        },
        error => {
          this.openSnackBar("Error al eliminar");
          console.log(error);
        }
      );
    }
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionTratamientoMedicamento, {
      duration: 4 * 1000, data: mensaje
    });
  }

  openDialogAnadirMedicamentoTratamiento(): void {
    const dialogRef = this.dialog.open(DialogoAnadirMedicamentoTratamiento, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      delete result['medicamento'];
      this.anadirMedicamentoTratamiento(result['datosMedicamentos']['nombre']);
      console.log(result);
    });
  }

  anadirMedicamentoTratamiento(medicamento){
    if(this.loginService.isLogged){
      this.tratamientoService.anadirTratamientoMedicamento(medicamento, this.idTratamiento)
      .subscribe(
        response =>{
          this.openSnackBar("Se ha añadido con éxito");
          console.log(response);
          this.getDatosTratamiento();
        },
        error => {
          this.openSnackBar("No se ha podido añadir");
          console.log(error);
        }
      );
    }
  }
}
