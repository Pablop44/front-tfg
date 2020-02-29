import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';
import { User } from 'src/app/models/User';
import { Cuenta } from 'src/app/models/Cuenta';

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
    console.log()
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

  public editarEstado(valor, user){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const CuentaToSend : Cuenta = {
      id: null,
      rol: user.rol,
      estado: valor,
      user: user.id
    }


    return this.http.post(this.restUrl+"/cuenta/edit.json", JSON.stringify(CuentaToSend)
    , httpOptions);
  }

  public editarRol(valor, user){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const CuentaToSend : Cuenta = {
      id: null,
      rol: valor,
      estado: user.estado,
      user: user.id
    }


    return this.http.post(this.restUrl+"/cuenta/edit.json", JSON.stringify(CuentaToSend)
    , httpOptions);
  }

  public editarEspecialidad(valor, user){


    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const userToSend : User = {
      id: user.id,
      dni: user.dni,
      username: user.username,
      password: user.password,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      poblacion: user.poblacion,
      colegiado: user.colegiado,
      cargo: user.cargo,
      especialidad: valor,
      cuenta: null,
      rol: user.rol,
    }

    console.log(userToSend);

    return this.http.post(this.restUrl+"/user/editarUser.json", JSON.stringify(userToSend)
    , httpOptions);
  }

  public editarUser(user){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    const userToSend : User = {
      id: user.id,
      dni: user.dni,
      username: user.username,
      password: user.password,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      poblacion: user.poblacion,
      colegiado: user.colegiado,
      cargo: user.cargo,
      especialidad: user.especialidad,
      cuenta: null,
      rol: user.rol,
    }

    return this.http.post(this.restUrl+"/user/editarUser.json", JSON.stringify(userToSend)
    , httpOptions);
  }
}
