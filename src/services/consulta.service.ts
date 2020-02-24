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

  public getHoras(x){
    let array = [{
      Field: 'fecha',
      Value: x
    },
    {
      Field: 'medico',
      Value: this.medico
    }
    ];
    
    // #1 Mapping the array to an object...
    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    // #2 Converting the object to JSON...
    let json = JSON.stringify(obj);
    
    console.log(json);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post(this.restUrl+"/getHoras.json", json
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
