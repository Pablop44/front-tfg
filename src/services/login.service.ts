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

  public login(username, password){
    let array = [{
      Field: 'username',
      Value: username
    },
    {
      Field: 'password',
      Value: password
    }
    ];
    
    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.restUrl+"/user/login.json", json
    , httpOptions);
  }

  setLoggedUser(username, token, rol, id){
    this.isLogged = true;
    this.loggedUser.username = username;
    this.loggedUser.password = token;
    this.loggedUser.rol = rol;
    this.loggedUser.id = id;
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    localStorage.setItem("id", id);
  }

  loginWithStorageUser():boolean{
    if(localStorage.getItem("username")!= null){
      this.isLogged = true;
      this.loggedUser.username = localStorage.getItem("username");
      this.loggedUser.password = localStorage.getItem("token");
      this.loggedUser.rol = localStorage.getItem("rol");
      this.loggedUser.id = parseInt(localStorage.getItem("id"));
      return true;
    }

    return false;

  }

  logout(){
    this.isLogged = false;
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
    return this.http.get(this.restUrl+"/user/logout/"+this.loggedUser.id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loggedUser.password
      })
    });
  }
  
}


