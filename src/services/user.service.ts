import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 

  }

  todosUsuarios(){

    return this.http.get(this.restUrl+"/user/usuarios.json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  eliminarUser(id){
    return this.http.delete(this.restUrl+"/user/delete/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  registroMedico(formResgistro){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    console.log(formResgistro);

    return this.http.post(this.restUrl+"/user/registerMedico.json", JSON.stringify(formResgistro), httpOptions);

  }

  datosUsuario(id){
    return this.http.get(this.restUrl+"/user/view/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }

  todosMedicos(){
    return this.http.get(this.restUrl+"/user/todosMedicos.json", {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.loginService.loggedUser.username+':'+this.loginService.loggedUser.password)
      })
    });
  }
}
