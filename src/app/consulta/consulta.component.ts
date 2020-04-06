import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Consulta } from '../models/Consulta';

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

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'datosConsulta', cols: 2, rows: 2, cuerpo: "hola"}
        ];
      } 

      return [
        { title: 'datosConsulta', cols: 2, rows: 2, cuerpo: "hola"}
      ];
    })
  );

  constructor(private route : ActivatedRoute, consultaService: ConsultaService, private breakpointObserver: BreakpointObserver, loginService: LoginService) { 
    this.consultaService = consultaService;
    this.loginService = loginService;
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idConsulta = params['id'];
      this.getDatosConsulta(this.idConsulta);
      });
  }

  getDatosConsulta(idConsulta){
    if(this.loginService.isLogged){
      this.consultaService.getDatosConsulta(idConsulta)
      .subscribe(
        response =>{
          this.idFicha = response['ficha'];
          this.fecha = response['fecha'];
          this.consulta = new Consulta(response['id'],response['lugar'],response['motivo'], response['fecha'],response['diagnostico'],response['observaciones'], response['ficha'], response['estado']);
          console.log(this.consulta);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
