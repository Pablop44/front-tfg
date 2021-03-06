import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router) { 

  }

  registro(dni, username, password, nombre, email, apellidos, telefono, poblacion, colegiado){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };
    const userToSend : User = {
      id: null,
      dni: dni,
      username: username,
      password: password,
      email: email,
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      poblacion: poblacion,
      colegiado: colegiado,
      cargo: null,
      especialidad: null,
      cuenta: null,
      rol: null
    }

    console.log(userToSend);

    return this.http.post(this.restUrl+"/user/register.json", JSON.stringify(userToSend), httpOptions);

  }
}
