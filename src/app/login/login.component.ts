import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cadenas: any = [];
  formUser:User ={
    id: null,
    username:null,
    password:null,
    email:null,
    nombre:null,
    apellidos:null,
    telefono:null,
    poblacion:null,
    cargo:null,
    especialidad:null,
    cuenta:null,
  };

  loginNotification:string ="";

  loginService:LoginService;

  constructor(usersService:LoginService, private router : Router) { 
    this.loginService = usersService;
  }

  onSubmit(){
    this.loginService.login(this.formUser.username, this.formUser.password)
      .subscribe(
        response=>{
          console.log(response);
          this.loginNotification = "";
          this.loginService.setLoggedUser(this.formUser.username, this.formUser.password);
        },
        error=>{
          console.log(error);
          this.loginNotification = error;
        }
      );
  }


  ngOnInit() {
  }

}
