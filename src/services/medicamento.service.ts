import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';
import { Medicamento } from 'src/app/medicamentos/medicamentos.component';


@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router,private loginService : LoginService) { }


  public todosMedicamentos(pagina, aMostrar, tipo, filtro){

  if(tipo == null){

    if(filtro.marca == null && filtro.maxDosis == null && filtro.minDosis == null && filtro.nombre == null){
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

      return this.http.post(this.restUrl+"/medicamento/medicamentos.json", json,
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

  public anadirMedicamento(datos){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const medicamentoToSend : Medicamento = {
      nombre: datos.nombre,
      viaAdministracion: datos.viaAdministracion,
      marca: datos.marca,
      dosis: datos.dosis
    }


    return this.http.post(this.restUrl+"/medicamento/add.json", JSON.stringify(medicamentoToSend)
    , httpOptions);
  }


  eliminarMedicamento(nombre){
    return this.http.delete(this.restUrl+"/medicamento/delete/"+nombre+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  numeroMedicamento(filtro){

      if(filtro.marca == null && filtro.maxDosis == null && filtro.minDosis == null && filtro.nombre == null){
        filtro = null;
      }
  
      let array = [
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
  
        return this.http.post(this.restUrl+"/medicamento/numeroMedicamentos.json", json,
         httpOptions);
  }
}
