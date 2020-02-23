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


  public consultasFicha(id){
    return this.httpClient.get(this.restUrl+"/consultaFicha/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  public getHoras(datos){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    var obj = JSON.stringify('{ "name":"John", "age":30, "city":"New York"}');
    return this.httpClient.post(this.restUrl+"/getHoras.json", obj
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
