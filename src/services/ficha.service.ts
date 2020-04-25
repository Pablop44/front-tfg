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
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
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
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
      return this.http.post(this.restUrl+"/ficha/fichas.json", json,
      httpOptions);
    }
        
    }

  fichasMedico(pagina, aMostrar, tipo, filtro){
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
        },
        {
          Field: 'medico',
          Value: this.loginService.loggedUser.username
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
      
      console.log(json);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/ficha/fichasMedico.json", json,
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
        },
        {
          Field: 'medico',
          Value: this.loginService.loggedUser.username
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
      
      console.log(json);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
      return this.http.post(this.restUrl+"/ficha/fichasMedico.json", json,
      httpOptions);
    }
  }


  numeroFichasMedico(filtro){

      if(filtro.id == null && filtro.fechaInicio == null && filtro.fechaFin == null && filtro.dniPaciente == null && filtro.nombrePaciente == null 
        && filtro.apellidosPaciente == null && filtro.dniMedico == null && filtro.nombreMedico == null 
        && filtro.apellidosMedico == null && filtro.colegiado == null && filtro.asma == null && filtro.diabetes == null && filtro.migranas == null){
        filtro = null;
      }

      let array = [
        {
          Field: 'filtro',
          Value: filtro
        },
        {
          Field: 'medico',
          Value: this.loginService.loggedUser.username
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
      
      console.log(json);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/ficha/numeroFichasMedico.json", json,
         httpOptions);
  }

  numeroFichas(){
    return this.http.get(this.restUrl+"/ficha/numeroFichas.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  datosFicha(id){
    return this.http.get(this.restUrl+"/ficha/view/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  getFichaPaciente(idUser){
    return this.http.get(this.restUrl+"/ficha/getFichaPaciente/"+idUser+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  eliminarFicha(id){
    return this.http.delete(this.restUrl+"/ficha/delete/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public cambiarMedico(idMedico, idFicha){

    let array = [{
      Field: 'medico',
      Value: idMedico
    },
    {
      Field: 'id',
      Value: idFicha
    }
    ];

    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.http.post(this.restUrl+"/ficha/cambiarMedico.json", json,
       httpOptions);
  }

}
