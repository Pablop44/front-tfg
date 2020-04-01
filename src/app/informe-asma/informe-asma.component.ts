import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import { AsmaService } from 'src/services/asma.service';
import { InformeAsma } from '../models/InformeAsma';

@Component({
  selector: 'app-informe-asma',
  templateUrl: './informe-asma.component.html',
  styleUrls: ['./informe-asma.component.css']
})
export class InformeAsmaComponent implements OnInit {

  loginService: LoginService;
  asmaService: AsmaService;
  sub: Subscription;
  idInformeAsma: String;
  datosInformeAsma: InformeAsma;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'asma', cols: 2, rows: 3, cuerpo: "hola"},
        ];
      }

      return [
        { title: 'asma', cols: 2, rows: 3, cuerpo: "hola"},
      ];
    })
  );

  constructor(loginService: LoginService, asmaService: AsmaService, private breakpointObserver: BreakpointObserver, private route : ActivatedRoute) {
    this.loginService = loginService;
    this.asmaService = asmaService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeAsma = params['id'];
      this.informeAsma(this.idInformeAsma);
      });
  }

  informeAsma(id){
    if(this.loginService.isLogged){
      this.asmaService.informeAsma(id)
      .subscribe(
        response =>{
        
          this.datosInformeAsma = new InformeAsma(response['id'],response['fecha'],response['calidadSueno'], response['dificultadRespirar'],
          response['tos'], response['gravedadTos'], response['limitaciones'], response['silbidos'], response['usoMedicacion'],
          response['espirometria'], response['factoresCrisis'], response['estadoGeneral']);
          console.log(this.datosInformeAsma);
          
          },
        error => {
          console.log(error);
        }
      );
    }
  }

}
