import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intructions-activate',
  templateUrl: './intructions-activate.component.html',
  styleUrls: ['./intructions-activate.component.css']
})

export class IntructionsActivateComponent implements OnInit {

  

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigateByUrl("/login");
  }

}
