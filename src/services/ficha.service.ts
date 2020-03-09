import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 

  }

  todasFichas(pagina, aMostrar, tipo, filtro){

    if(tipo == null){

      if(filtro.id == null && filtro.fechaInicio == null && filtro.fechaFin == null && filtro.dniPaciente == null && filtro.nombrePaciente == null 
        && filtro.apellidosPaciente == null && filtro.dniMedico == null && filtro.nombreMedico == null 
        && filtro.apellidosMedico == null && filtro.colegiado == null && filtro.asma == null && filtro.diabetes == null && filtro.migranas == null){
        filtro = null;
      }

  
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        },
        {
          Field: 'filtro',
          Value: filtro
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
      
      console.log(json);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
        })
      };
  
        return this.http.post(this.restUrl+"/ficha/fichas.json", json,
         httpOptions);
    }else{
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        }
        ,
        {
          Field: 'tipo',
          Value: tipo
        },
        {
          Field: 'filtro',
          Value: filtro
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
      
      console.log(json);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
        })
      };
  
        return this.http.post(this.restUrl+"/medicamento/medicamentos.json", json,
         httpOptions);
    }
        
    }

  fichasMedico(){
    return this.http.get(this.restUrl+"/ficha/fichasMedico/"+this.loginService.loggedUser.username+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  numeroFichas(){
    return this.http.get(this.restUrl+"/ficha/numeroFichas.json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  datosFicha(id){
    return this.http.get(this.restUrl+"/ficha/view/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }
}
