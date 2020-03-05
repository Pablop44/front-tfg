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


  public consultasFicha(id, pagina, aMostrar){

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
    }
    ];
    
    // #1 Mapping the array to an object...
    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    // #2 Converting the object to JSON...
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
    
    // #1 Mapping the array to an object...
    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    // #2 Converting the object to JSON...
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
