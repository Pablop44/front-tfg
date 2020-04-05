import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class FichaEnfermedadService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 
  }

  anadirEnfermedad(idFicha, enfermedad){
    let array = [{
      Field: 'ficha',
      Value: idFicha
    },
    {
      Field: 'enfermedad',
      Value: enfermedad
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

      return this.http.post(this.restUrl+"/fichaEnfermedad/anadirEnfermedad.json", json,
       httpOptions);
  }

  eliminarEnfermedad(idFicha, enfermedad){
    let array = [{
      Field: 'ficha',
      Value: idFicha
    },
    {
      Field: 'enfermedad',
      Value: enfermedad
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

      return this.http.post(this.restUrl+"/fichaEnfermedad/eliminarEnfermedad.json", json,
       httpOptions);
  }
}
