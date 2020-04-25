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

  errorNombre : boolean;
  errorVia: boolean;
  errorMarca: boolean;
  errorDosis: boolean;
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

  validarVia(): Boolean{
    if(this.data['viaAdministracion'] != ""){
      this.errorVia = false;
      return true;
    }else{
      this.errorVia = true;
      return false;
    }
  }

  validarMarca(): Boolean{
    if(marcaElegida != ""){
      this.errorMarca = false;
      return true;
    }else{
      this.errorMarca = true;
      return false;
    }
  }

  validarNombre(): Boolean{
    if(this.data['nombre'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data['nombre']) === true){
        this.errorNombre = false;
        return true;
      }else{
        this.errorNombre = true;
        return false;
      }
    }else{
      this.errorNombre = true;
      return false;
    }
  }

  validarDosis(): Boolean{
    if(this.data['dosis'] != null){
      var nameRegex = /^[0-9\s]*$/;
      if(nameRegex.test(this.data['dosis']) === true){
        this.errorDosis= false;
        return true;
      }else{
        this.errorDosis= true;
        return false;
      }
    }else{
      this.errorDosis= true;
      return false;
    }
  }
}

@Component({
  selector: 'dialogoAnadirMarca',
  templateUrl: 'dialogoAnadirMarca.html'
})

export class DialogoAnadirMarca{ 

  errorNombre: Boolean;
  errorPais: Boolean;

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

  validarNombre(): Boolean{
    if(this.data['nombre'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data['nombre']) === true){
        this.errorNombre = false;
        return true;
      }else{
        this.errorNombre = true;
        return false;
      }
    }else{
      this.errorNombre = true;
      return false;
    }
  }

  validarPais(): Boolean{
    if(this.data['pais'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data['pais']) === true){
        this.errorPais = false;
        return true;
      }else{
        this.errorPais = true;
        return false;
      }
    }else{
      this.errorPais = true;
      return false;
    }
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
    minDosis: null,
    maxDosis: null
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
  }

  todosMedicamentos(){
    if(this.loginService.isLogged){
      this.numeroMedicamento();
      this.medicamentoService.todosMedicamentos(this.currentPage, this.pageSize, this.orden, this.filtroMedicamento)
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
          this.filtroMedicamento.maxDosis = null;
          this.filtroMedicamento.minDosis  = null;
          this.filtroMedicamento.nombre = null;
          this.filtroMedicamento.marca = null;
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
      if(this.validarMedicamento(response)){
        if(this.loginService.isLogged){
          this.medicamentoService.anadirMedicamento(response)
          .subscribe(
            response =>{
                console.log(response);
                this.todosMedicamentos();
                this.openSnackBar("Se ha añadido el medicamento: \""+response['nombre']+"\"");
            },
            error => {
              this.openSnackBar("No se ha podido añadir el medicamento");
              console.log(error);
            }
          );
        }
      }
    });
  }

  validarMedicamento(response) : Boolean{
      return (this.validarNombre(response) && this.validarVia(response) && this.validarDosis(response) && this.validarMarca(response));
  }

  validarVia(response): Boolean{
    if(response['viaAdministracion'] != null){
      return true;
    }else{
      this.openSnackBar("La vía de administración tiene que introducirse");
    }
  }

  validarMarca(response): Boolean{
    console.log(response);
    if(response['marca'] !== ""){
      return true;
    }else{
      this.openSnackBar("La marca del medicamento tiene que introducirse");
    }
  }

  validarNombre(response): Boolean{
    if(response['nombre'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(response['nombre']) === true){
        return true;
      }else{
        this.openSnackBar("El formato del nombre no es correcto");
        return false;
      }
    }else{
      this.openSnackBar("Se debe introducir el nombre del medicamento");
    }
  }

  validarDosis(response): Boolean{
    if(response['dosis'] != null){
      var nameRegex = /^[0-9\s]*$/;
      if(nameRegex.test(response['dosis']) === true){
        return true;
      }else{
        this.openSnackBar("El formato de la dosis no es correcto");
        return false;
      }
    }else{
      this.openSnackBar("Se debe introducir la dosis del medicamento");
    }
  }


  validarNombreMarca(response): Boolean{
    if(response['nombre'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(response['nombre']) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del nombre de la marca");
        return false;
      }
    }else{
      this.openSnackBar("Es necesario introducir el nombre de la marca")
      return false;
    }
  }

  validarPais(response): Boolean{
    if(response['pais'] != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(response['pais']) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del pais de la marca");
        return false;
      }
    }else{
      this.openSnackBar("Es necesario introducir el pais de la marca")
      return false;
    }
  }

  validarMarcaMedicamento(response) : Boolean{
    return (this.validarNombreMarca(response) && this.validarPais(response));
  }

  
  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogoAnadirMarca, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(response => {
      if(this.loginService.isLogged){
        if(this.validarMarcaMedicamento(response)){
          this.marcaService.anadirMarca(response)
          .subscribe(
            response =>{
              this.todasMarcas();
                this.openSnackBar("Se ha añadido el medicamento: \""+response['nombre']+"\"")
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    });
  }

  todasMarcas(){
    if(this.loginService.isLogged){
      this.marcaService.todasMarcas()
      .subscribe(
        response =>{
          console.log(response);
          const marcaVacia = new Marca("","");
          this.marcas.push(marcaVacia);
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
        this.eliminarMedicamento(result['name']);
      }
    });
  }

  eliminarMedicamento(medicamento){
    this.medicamentoService.eliminarMedicamento(medicamento)
      .subscribe(
        response =>{console.log(response)
          this.todosMedicamentos();
          this.openSnackBar("Se ha eliminado el medicamento: \""+medicamento+"\"");
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el medicamento:" +medicamento);}
      );
    
    }

    numeroMedicamento(){
      
      this.medicamentoService.numeroMedicamento(this.filtroMedicamento)
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

      aplicarFiltro(){
        this.todosMedicamentos();
        this.numeroMedicamento();
      }

      establecerMarcaFiltro(nombre){
        if(nombre == ""){
          this.filtroMedicamento.marca = null;
        }else{
          this.filtroMedicamento.marca = nombre;
        } 
      }
}
