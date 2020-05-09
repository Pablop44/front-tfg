import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-activated-user',
  templateUrl: './activated-user.component.html',
  styleUrls: ['./activated-user.component.css']
})
export class ActivatedUserComponent implements OnInit {

  sub: Subscription;
  userService: UserService;

  constructor(private router : Router, private route : ActivatedRoute, userService: UserService) {
    this.userService = userService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.activarCuenta(params['id']);
      });
  }

  activarCuenta(id){
    this.userService.activarUsuario(id)
    .subscribe();
  }

  goToLogin(){
    this.router.navigateByUrl("/login");
  }

}
