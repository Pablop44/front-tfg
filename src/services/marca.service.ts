import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';
import { Marca } from 'src/app/models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router,private loginService : LoginService) { }

  todasMarcas(){
    return this.http.get(this.restUrl+"/marca/todasMarcas.json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  public anadirMarca(datos){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const marcaToSend : Marca = {
      nombre: datos.nombre,
      pais: datos.pais,
    }


    return this.http.post(this.restUrl+"/marca/add.json", JSON.stringify(marcaToSend)
    , httpOptions);
  }
}
