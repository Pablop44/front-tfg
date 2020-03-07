import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private restUrl = 'http://localhost:8765/consulta'; 
  public medico : string;

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public todasConsultas(){
    return this.httpClient.get(this.restUrl+`/consultas.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  public numeroConsultas(id,filtro){


    let array = [{
      Field: 'filtro',
      Value: filtro
    },
    {
      Field: 'id',
      Value: id
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

      return this.httpClient.post(this.restUrl+"/numeroConsultas.json", json,
       httpOptions);
  }


  public consultasFicha(id, pagina, aMostrar, tipo, filtro){

    if(filtro.id == null && filtro.lugar == "" && filtro.fechaFin == null && filtro.fechaInicio == null && filtro.diagnostico == null &&
     filtro.observaciones == null && filtro.tiempo == null && filtro.cancelada == null && filtro.aplazada == null && filtro.realizada == null){
      filtro = null;
    }

    if(tipo == null){
      let array = [{
        Field: 'id',
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
      })
    };

      return this.httpClient.post(this.restUrl+"/consultaFicha.json", json,
       httpOptions);

    }else{
      let array = [{
        Field: 'id',
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

      return this.httpClient.post(this.restUrl+"/consultaFicha.json", json,
       httpOptions);
    }
  }


  public getHoras(x){
    let array = [{
      Field: 'fecha',
      Value: x
    },
    {
      Field: 'medico',
      Value: this.medico
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

    return this.httpClient.post(this.restUrl+"/getHoras.json", json
    , httpOptions);
  }

  crearConsulta(datos){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post(this.restUrl+"/add.json", JSON.stringify(datos), httpOptions);

  }
}
