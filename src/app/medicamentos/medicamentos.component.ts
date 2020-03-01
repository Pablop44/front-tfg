import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { MedicamentoService } from 'src/services/medicamento.service';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  medicamentos : Medicamento[] = [];
  public dataSource: any;

  public pageSize = 15;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


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
    loginService:LoginService, userService:UserService, medicamentoService:MedicamentoService) {
      this.loginService = loginService;
      this.userService = userService;
      this.medicamentoService = medicamentoService;
     }

  ngOnInit() {
    this.todosMedicamentos();
  }

  todosMedicamentos(){
    if(this.loginService.isLogged){
      this.medicamentoService.todosMedicamentos()
      .subscribe(
        response =>{
          console.log(response);
            for (let i in response) {
              const newMedicamento = new Medicamento(response[i]['nombre'],response[i]['viaAdministracion'],response[i]['marca'], response[i]['dosis']);
              this.medicamentos.push(newMedicamento);
            } 

          this.dataSource = new MatTableDataSource<Medicamento>(this.medicamentos);
          this.dataSource.data = this.medicamentos;
          this.totalSize = this.medicamentos.length;
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
  }

}