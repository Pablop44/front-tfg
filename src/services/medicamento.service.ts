import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router,private loginService : LoginService) { }


  todosMedicamentos(){

    return this.http.get(this.restUrl+"/medicamento/medicamentos.json", {
      responseType:'text',
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
    
  }
}
