import { Component, ViewChild } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'front-tfg';
  loginService:LoginService;
  userService:UserService;
  peticiones: any;

  constructor(loginService:LoginService, private router : Router,  userService:UserService) { 
    this.loginService = loginService;
    this.userService = userService;
  }

  ngOnInit() {
    this.peticionesAutorizar();
  }

  logout(){
    this.loginService.logout()
      .subscribe(
        response=>{
          this.router.navigateByUrl("/login");
        },
        error=>{
        }
      );
  }

  peticionesAutorizar(){
    if(this.loginService.isLogged){
      this.userService.peticionesAutorizar()
      .subscribe(
        response =>{
          this.peticiones = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }



  login(){
    this.router.navigateByUrl("/login");
  }
}




