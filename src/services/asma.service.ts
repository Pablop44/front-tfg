import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AsmaService {

  private restUrl = 'http://localhost:8765/asma'; 

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public asmaFicha(id, pagina, aMostrar, tipo, filtro){

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

      return this.httpClient.post(this.restUrl+"/asmaFichas.json", json,
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

      return this.httpClient.post(this.restUrl+"/asmaFichas.json", json,
       httpOptions);
    }
  }


  public numeroInformesAsma(id,filtro){

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

      return this.httpClient.post(this.restUrl+"/numeroInformesAsma.json", json,
       httpOptions);
  }

  public todosInformesAsma(id,filtro){

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

      return this.httpClient.post(this.restUrl+"/todosAsmaFichas.json", json,
       httpOptions);
  }

  public informeAsma(id){
    return this.httpClient.get(this.restUrl+'/view/'+id+'.json', {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }
}
