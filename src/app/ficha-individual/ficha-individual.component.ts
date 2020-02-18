import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { FichaService } from 'src/services/ficha.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';



@Component({
  selector: 'app-ficha-individual',
  templateUrl: './ficha-individual.component.html',
  styleUrls: ['./ficha-individual.component.css']
})
export class FichaIndividualComponent implements OnInit {

  dataSource;
  ficha : any = [];
  medico: any = [];
  paciente: any = [];
  consultaService: ConsultaService;
  loginService: LoginService;
  userService:UserService;
  fichaService:FichaService;
  sub: Subscription;
  id: number;
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
        { title: 'Consultas', cols: 2, rows: 2, cuerpo: 'cuerpo3' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, consultaService:ConsultaService,
    private route : ActivatedRoute,
    loginService:LoginService, userService:UserService, fichaService:FichaService) {
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
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
