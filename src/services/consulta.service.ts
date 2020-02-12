import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private restUrl = 'http://localhost:8765/consulta'; 

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public todasConsultas(){
    return this.httpClient.get(this.restUrl+`/consultas.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }
}