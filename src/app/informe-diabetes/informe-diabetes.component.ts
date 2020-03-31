import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { DiabetesService } from 'src/services/diabetes.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import { InformeDiabetes } from '../models/InformeDiabetes';

@Component({
  selector: 'app-informe-diabetes',
  templateUrl: './informe-diabetes.component.html',
  styleUrls: ['./informe-diabetes.component.css']
})
export class InformeDiabetesComponent implements OnInit {

  loginService: LoginService;
  diabetesService: DiabetesService;
  sub: Subscription;
  idInformeDiabetes: String;
  datosInformeDiabetes: InformeDiabetes;

  constructor(loginService: LoginService, diabetesService: DiabetesService, private route : ActivatedRoute) {
    this.loginService = loginService;
    this.diabetesService = diabetesService;
    
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idInformeDiabetes = params['id'];
      this.informeDiabetes(this.idInformeDiabetes);
      });
  }

  informeDiabetes(id){
    if(this.loginService.isLogged){
      this.diabetesService.informeDiabetes(id)
      .subscribe(
        response =>{
        
          this.datosInformeDiabetes = new InformeDiabetes(response['id'],response['fecha'],response['numeroControles'], response['nivelBajo'],
          response['frecuenciaBajo'], response['horarioBajo'], response['perdidaConocimiento'], response['nivelAlto'], response['frecuenciaAlto'],
          response['horarioAlto'], response['actividadFisica'], response['problemaDieta'], response['estadoGeneral'], response['momentos']);
          console.log(this.datosInformeDiabetes);
          
          },
        error => {
          console.log(error);
        }
      );
    }
  }

}
