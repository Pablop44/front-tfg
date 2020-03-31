import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import { MigranasService } from 'src/services/migranas.service';
import { InformeMigranas } from '../models/InformeMigranas';

@Component({
  selector: 'app-informe-migranas',
  templateUrl: './informe-migranas.component.html',
  styleUrls: ['./informe-migranas.component.css']
})
export class InformeMigranasComponent implements OnInit {

  loginService: LoginService;
  migranasService: MigranasService;
  sub: Subscription;
  idInformeMigranas: String;
  datosInformeMigranas: InformeMigranas;

  constructor(loginService: LoginService, migranasService: MigranasService, private route : ActivatedRoute) {
    this.loginService = loginService;
    this.migranasService = migranasService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeMigranas = params['id'];
      this.informeMigranas(this.idInformeMigranas);
      });
  }


  informeMigranas(id){
    if(this.loginService.isLogged){
      this.migranasService.informeMigranas(id)
      .subscribe(
        response =>{
          this.datosInformeMigranas = new InformeMigranas(response['id'],response['fecha'],response['frecuencia'], response['duracion'],
          response['horario'], response['finalizacion'], response['tipoEpisodio'], response['intensidad'], response['limitaciones'],
          response['despiertoNoche'], response['estadoGeneral'], response['sintomas'], response['factores']);
          console.log(this.datosInformeMigranas);
          },
        error => {
          console.log(error);
        }
      );
    }
  }

}
