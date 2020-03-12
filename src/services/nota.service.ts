import { Injectable } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 
  }

  todasNotas(id, pagina, aMostrar, tipo, filtro){

    if(tipo == null){

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
        })
      };
  
        return this.http.post(this.restUrl+"/nota/notasFicha.json", json,
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
        })
      };
  
      return this.http.post(this.restUrl+"/nota/notasFicha.json", json,
      httpOptions);
    }
        
  }

  public numeroNotas(id,filtro){

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
      })
    };

      return this.http.post(this.restUrl+"/nota/numeroNotas.json", json,
       httpOptions);
  }
}
