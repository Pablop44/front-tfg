import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class MigranasService {

  private restUrl = 'http://localhost:8765/migranas'; 

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public migranasFicha(id, pagina, aMostrar, tipo, filtro){

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
    

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.httpClient.post(this.restUrl+"/migranasFichas.json", json,
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

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.httpClient.post(this.restUrl+"/migranasFichas.json", json,
       httpOptions);
    }
  }

  public numeroInformesMigranas(id,filtro){

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
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.httpClient.post(this.restUrl+"/numeroInformesMigranas.json", json,
       httpOptions);
  }

  public todosInformesMigranas(id,filtro){

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
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.httpClient.post(this.restUrl+"/todosMigranasFichas.json", json,
       httpOptions);
  }

  public informeMigranas(id){
    return this.httpClient.get(this.restUrl+'/view/'+id+'.json', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public analisisDeSentimientos(id){
    return this.httpClient.get(this.restUrl+'/analisisDeSentimientos/'+id+'.json', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public eliminarInforme(id){
    return this.httpClient.get(this.restUrl+'/delete/'+id+'.json', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }
}
