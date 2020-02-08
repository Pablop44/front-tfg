import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private restUrl = 'http://localhost:8765'; 

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public todasConsultas(){
    return this.httpClient.get(this.restUrl+`/consultas.json`);
  }
}
