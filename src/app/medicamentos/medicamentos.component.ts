import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/services/consulta.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MedicamentoService } from 'src/services/medicamento.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  loginService: LoginService;
  userService:UserService;
  medicamentoService: MedicamentoService;


  displayedColumns: string[] = ['nombre', 'via', 'marca', 'dosis'];

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
            console.log(response)
          },
        error => {
          console.log(error);
        }
      );
    }
  }

}
