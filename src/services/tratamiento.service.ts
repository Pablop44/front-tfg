import { Injectable } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 
  }

  getDatosTratamiento(id){
    return this.http.get(this.restUrl+`/tratamiento/view/`+id+`.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }


  todosTratamientos(id, pagina, aMostrar, tipo, filtro){

    if(tipo == null){

        filtro = null;

      let array = [
        {
          Field: 'idFicha',
          Value: id
        },
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
  
        return this.http.post(this.restUrl+"/tratamiento/tratramientosFicha.json", json,
         httpOptions);
    }else{
      let array = [
        {
          Field: 'idFicha',
          Value: id
        },
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
  
      return this.http.post(this.restUrl+"/tratamiento/tratramientosFicha.json", json,
      httpOptions);
    }   
  }

  public numeroTratamientos(id,filtro){

    let array = [{
      Field: 'filtro',
      Value: filtro
    },
    {
      Field: 'idFicha',
      Value: id
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

      return this.http.post(this.restUrl+"/tratamiento/numeroTratramientosFicha.json", json,
       httpOptions);
  }


  public eliminarTratamientoMedicamento(medicamento,tratamiento){

    let array = [{
      Field: 'medicamento',
      Value: medicamento
    },
    {
      Field: 'tratamiento',
      Value: tratamiento
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

      return this.http.post(this.restUrl+"/tratamientoMedicamento/delete.json", json,
       httpOptions);
  }

  public anadirTratamientoMedicamento(medicamento,tratamiento){

    let array = [{
      Field: 'medicamento',
      Value: medicamento
    },
    {
      Field: 'tratamiento',
      Value: tratamiento
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

      return this.http.post(this.restUrl+"/tratamientoMedicamento/add.json", json,
       httpOptions);
  }

  public crearTratamiento(tratamiento){
    
    let json = JSON.stringify(tratamiento);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.http.post(this.restUrl+"/tratamiento/crearTratamiento.json", json,
       httpOptions);
  }

  eliminarTratamiento(id){
    return this.http.delete(this.restUrl+"/tratamiento/delete/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }
}
