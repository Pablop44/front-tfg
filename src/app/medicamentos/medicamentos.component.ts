import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { MedicamentoService } from 'src/services/medicamento.service';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MarcaService } from 'src/services/marca.service';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import { FiltroMedicamento } from 'src/app/models/FiltroMedicamento';

var marcaElegida;

@Component({
  selector: 'dialogoEliminarMedicamento',
  templateUrl: 'dialogoEliminarMedicamento.html',
})
export class dialogoEliminarMedicamento {

  constructor(
    public dialogRef: MatDialogRef<dialogoEliminarMedicamento>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'notificacion',
  templateUrl: 'notificacion.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionComponentMedicamento {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

class Marca {
  nombre: string;
  pais: string;
  constructor(nombre, pais){
    this.nombre = nombre;
    this.pais = pais;
  }
}

@Component({
  selector: 'dialogoAnadirMedicamento',
  templateUrl: 'dialogoAnadirMedicamento.html'
})

export class DialogoAnadirMedicamento{ 

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirMedicamento>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valorSelect(valor){
    marcaElegida = valor;
  }
}

@Component({
  selector: 'dialogoAnadirMarca',
  templateUrl: 'dialogoAnadirMarca.html'
})

export class DialogoAnadirMarca{ 

  constructor(
    public dialogRef: MatDialogRef<DialogoAnadirMedicamento>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valorSelect(valor){
    marcaElegida = valor;
  }
}

export class Medicamento {
  nombre: string;
  viaAdministracion: string;
  marca: string;
  dosis: number;
  constructor(nombre, viaAdministracion, marca, dosis){
    this.nombre = nombre;
    this.viaAdministracion = viaAdministracion;
    this.marca = marca;
    this.dosis = dosis;
  }
}

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  loginService: LoginService;
  userService:UserService;
  medicamentoService: MedicamentoService;
  marcaService: MarcaService;
  medicamentos : Medicamento[] = [];
  public dataSource: any;
  marcas : Marca[] = []; 

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  orden:null;


  filtroMedicamento: FiltroMedicamento ={
    nombre: null, 
    viaAdministacion: null,
    marca: null,
    dosis: null
  }


  displayedColumns: string[] = ['nombre', 'via', 'marca', 'dosis', 'acciones'];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Medicamentos', cols: 2, rows: 3, cuerpo: "hola"}
        ];
      }

      return [
        { title: 'Medicamentos', cols: 2, rows: 3, cuerpo: "hola"}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    loginService:LoginService, userService:UserService, medicamentoService:MedicamentoService, public dialog: MatDialog, marcaService: MarcaService, private _snackBar: MatSnackBar) {
      this.loginService = loginService;
      this.userService = userService;
      this.medicamentoService = medicamentoService;
      this.marcaService = marcaService;
     }

  ngOnInit() {
    this.todosMedicamentos();
    this.todasMarcas();
    this.numeroMedicamento();
  }

  todosMedicamentos(){
    if(this.loginService.isLogged){
      this.medicamentoService.todosMedicamentos(this.currentPage, this.pageSize, this.orden)
      .subscribe(
        response =>{
          this.medicamentos = [];
          console.log(response);
            for (let i in response) {
              const newMedicamento = new Medicamento(response[i]['nombre'],response[i]['viaAdministracion'],response[i]['marca'], response[i]['dosis']);
              this.medicamentos.push(newMedicamento);
            } 

          this.dataSource = new MatTableDataSource<Medicamento>(this.medicamentos);
          this.dataSource.data = this.medicamentos;
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
    this.todosMedicamentos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoAnadirMedicamento, {
      width: '500px',
      data: {marca: this.marcas}
    });


    dialogRef.afterClosed().subscribe(response => {
      response['marca'] = marcaElegida;
      if(this.loginService.isLogged){
        this.medicamentoService.anadirMedicamento(response)
        .subscribe(
          response =>{
              console.log(response);
              const newMedicamento = new Medicamento(response['nombre'],response['viaAdministracion'], response['marca'],response['dosis']);
              console.log(newMedicamento);
              this.openSnackBar("Se ha añadido el medicamento: \""+newMedicamento.nombre+"\"");
              this.medicamentos.push(newMedicamento);
              this.dataSource.data = this.medicamentos;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogoAnadirMarca, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(response => {
      if(this.loginService.isLogged){
        this.marcaService.anadirMarca(response)
        .subscribe(
          response =>{
            console.log(response);
              const newMarca = new Marca(response['nombre'],response['pais']);
              this.marcas.push(newMarca);
              this.openSnackBar("Se ha añadido el medicamento: \""+newMarca.nombre+"\"")
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  todasMarcas(){
    if(this.loginService.isLogged){
      this.marcaService.todasMarcas()
      .subscribe(
        response =>{
          console.log(response);
            for (let i in response) {
              const newMarca = new Marca(response[i]['nombre'],response[i]['pais']);
              this.marcas.push(newMarca);
              
            } 
          },
        error => {
          console.log(error);
        }
      );
    }
  }
  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionComponentMedicamento, {
      duration: 4 * 1000, data: mensaje
    });
  }

  openDialog4(medicamento:Medicamento): void {
    const dialogRef = this.dialog.open(dialogoEliminarMedicamento, {
      width: '400px',
      data: {name: medicamento.nombre, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.respuesta == "Si"){
        this.eliminarMedicamento(medicamento);
      }
    });
  }

  eliminarMedicamento(medicamento){
      
    this.medicamentoService.eliminarMedicamento(medicamento.nombre)
      .subscribe(
        response =>{console.log(response)
         
            this.medicamentos = this.medicamentos.filter(u => u !== medicamento);
            this.dataSource.data = this.dataSource.data.filter(u => u !== medicamento);
          
          this.openSnackBar("Se ha eliminado el medicamento: \""+medicamento.nombre+"\"");
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el medicamento:" +medicamento.nombre);}
      );
    
    }

    numeroMedicamento(){
      
      this.medicamentoService.numeroMedicamento()
        .subscribe(
          response =>{
              this.totalSize = response['numero'];
            },
          error => {
            console.log(error)
          }
        );
      }

      ordenar(tipo){
        if(this.loginService.isLogged){
          
          this.orden = tipo;
          this.todosMedicamentos();
          
        }
      }
}
