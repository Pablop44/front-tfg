import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  loggedUser:User = new User();
  isLogged:boolean = false;

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router) { 
    this.loginWithStorageUser();

  }

  login(username, password){

    return this.http.get(this.restUrl+"/user/login.json", {
      responseType:'text',
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username+':'+password)
      })
    });
    
  }

  setLoggedUser(username, password, rol, id){
    this.isLogged = true;
    this.loggedUser.username = username;
    this.loggedUser.password = password;
    this.loggedUser.rol = rol;
    this.loggedUser.id = id;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("rol", rol);
    localStorage.setItem("id", id);
  }

  loginWithStorageUser():boolean{
    if(localStorage.getItem("username")!= null){
      this.isLogged = true;
      this.loggedUser.username = localStorage.getItem("username");
      this.loggedUser.password = localStorage.getItem("password");
      this.loggedUser.rol = localStorage.getItem("rol");
      this.loggedUser.id = parseInt(localStorage.getItem("id"));
      return true;
    }

    return false;

  }

  logout(){
    this.isLogged = false;
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
    return this.http.get(this.restUrl+"/user/logout.json");
  }
  
}


