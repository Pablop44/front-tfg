import { Component, ViewChild } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'front-tfg';
  loginService:LoginService;

  constructor(loginService:LoginService, private router : Router) { 
    this.loginService = loginService;
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

  login(){
    this.router.navigateByUrl("/login");
  }
}




