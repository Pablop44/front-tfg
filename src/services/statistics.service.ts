import { Injectable } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private restUrl = 'http://localhost:8765';

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 
  }

  estadisticasUsuarios(){
    return this.http.get(this.restUrl+"/estatistics/estadisticasUsuario.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  estadisticasEnfermedadesPorSexo(){
    return this.http.get(this.restUrl+"/estatistics/estadisticasEnfermedadesPorSexo.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  estadisticaEnfermedadesPorEdad(){
    return this.http.get(this.restUrl+"/estatistics/estadisticasEnfermedadesPorEdad.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  estadisticasEnfermedades(){
    return this.http.get(this.restUrl+"/estatistics/estadisticasEnfermedades.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }
}
