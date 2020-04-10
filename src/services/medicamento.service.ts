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
    let array = [
      {
        Field: 'nombre',
        Value: nombre
      }
      ];
      let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };


      return this.http.post(this.restUrl+"/medicamento/delete.json", json,
       httpOptions);
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
      
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
        })
      };
  
        return this.http.post(this.restUrl+"/medicamento/numeroMedicamentos.json", json,
         httpOptions);
  }

  buscarMedicamento(nombre){
    let array = [
      {
        Field: 'nombre',
        Value: nombre
      }
      ];
      let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);
    

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    console.log(json);
      return this.http.post(this.restUrl+"/medicamento/buscarMedicamento.json", json,
       httpOptions);
  }
}
