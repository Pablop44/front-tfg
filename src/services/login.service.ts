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

  setLoggedUser(username, password, rol){
    this.isLogged = true;
    this.loggedUser.username = username;
    this.loggedUser.password = password;
    this.loggedUser.rol = rol;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("rol", rol);
  }

  loginWithStorageUser():boolean{
    if(localStorage.getItem("username")!= null){
      this.isLogged = true;
      this.loggedUser.username = localStorage.getItem("username");
      this.loggedUser.password = localStorage.getItem("password");
      return true;
    }

    return false;

  }

  logout(){
    this.isLogged = false;
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    return this.http.get(this.restUrl+"/user/logout.json");
  }
  
}


