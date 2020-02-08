import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  todasConsultas: any = [];
  consultaService: ConsultaService;


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Consultas', cols: 1, rows: 1, cuerpo: 'cuerpo1'},
          { title: 'Usuarios', cols: 1, rows: 1, cuerpo: 'cuerpo2' },
          { title: 'Medicamentos', cols: 1, rows: 1, cuerpo: 'cuerpo3' },
          { title: 'Fichas', cols: 1, rows: 1, cuerpo: 'cuerpo4' }
        ];
      }

      return [
        { title: 'Consultas', cols: 2, rows: 1, cuerpo: 'cuerpo1' },
        { title: 'Usuarios', cols: 1, rows: 2, cuerpo: 'cuerpo2' },
        { title: 'Medicamentos', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
        { title: 'Fichas', cols: 2, rows: 2, cuerpo: 'cuerpo4' },
        { title: 'Notas', cols: 1, rows: 1 },
        { title: 'Enfermedades', cols: 1, rows: 1, cuerpo: 'cuerpo5' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, consultaService:ConsultaService,
    private router : Router) {
      this.consultaService = consultaService;
    }

  ngOnInit() {
    
  
  }
  
  consultas(){
    this.consultaService.todasConsultas()
      .subscribe(
        response =>{
          console.log(response);
          this.todasConsultas = response;
        },
        error => {console.log(error);}
      );
  }
  
}
  

  


