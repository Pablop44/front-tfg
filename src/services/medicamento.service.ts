import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';
import { Medicamento } from 'src/app/medicamentos/medicamentos.component';


@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router,private loginService : LoginService) { }


  todosMedicamentos(){
    return this.http.get(this.restUrl+"/medicamento/medicamentos.json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  public anadirMedicamento(datos){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const medicamentoToSend : Medicamento = {
      nombre: datos.nombre,
      viaAdministracion: datos.viaAdministracion,
      marca: datos.marca,
      dosis: datos.dosis
    }


    return this.http.post(this.restUrl+"/medicamento/add.json", JSON.stringify(medicamentoToSend)
    , httpOptions);
  }


  eliminarMedicamento(nombre){
    return this.http.delete(this.restUrl+"/user/delete/"+nombre+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }
}
