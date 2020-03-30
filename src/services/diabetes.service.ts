import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DiabetesService {

  private restUrl = 'http://localhost:8765/diabetes'; 

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }


  public diabetesFicha(id, pagina, aMostrar, tipo, filtro){

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

      return this.httpClient.post(this.restUrl+"/diabetesFichas.json", json,
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

      return this.httpClient.post(this.restUrl+"/diabetesFichas.json", json,
       httpOptions);
    }
  }
}
