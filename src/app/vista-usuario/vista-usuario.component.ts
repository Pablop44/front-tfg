import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, OnInit, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'notificacionVistaUser',
  templateUrl: 'notificacionVistaUser.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class notificacionVistaUserComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

class Medico {
  nombre: string;
  id: string;
  constructor(nombre, id){
    this.nombre = nombre;
    this.id = id;
  }
}

@Component({
  selector: 'dialogoEliminarUsuarioVista',
  templateUrl: 'dialogoEliminarUsuarioVista.html',
})
export class DialogoEliminarUsuarioVista {
  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarUsuarioVista>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogoEditarUsuario',
  templateUrl: 'dialogoEditarUsuario.html',
})
export class DialogoEditarUsuario {
  constructor(
    public dialogRef: MatDialogRef<DialogoEditarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {
  id: string;
  sub: Subscription;
  loginService: LoginService;
  userService: UserService;
  datosUser: any = [];
  myForm : FormBuilder;

  medico: Medico[] = [];

  cards;

  estado: any[] = [
  {"name": "Autorizada", ID: "D1", "value": "autorizada"},
  {"name": "Activada", ID: "D2", "value": "activada"},
  {"name": "Desactivada", ID: "D3", "value": "desactivada"}
  ];
  chosenItem = this.estado[0].value;
  
  rol: any[] = [
    {"name": "Administrador", ID: "D1", "value": "administrador"},
    {"name": "Medico", ID: "D2", "value": "medico"},
    {"name": "Paciente", ID: "D3", "value": "paciente"}
    ];
    chosenItem2 = this.rol[0].value;

  enfermedades: any[] = [
    {"name": "Migrañas", ID: "D1", "value": "migranas"},
    {"name": "Diabetes", ID: "D2", "value": "diabetes"},
    {"name": "Asma", ID: "D3", "value": "asma"}
    ];
    chosenItem3 = this.rol[0].value;

  constructor(private fb: FormBuilder,private breakpointObserver: BreakpointObserver,private _snackBar: MatSnackBar,private router : Router, public dialog: MatDialog, private route : ActivatedRoute,loginService:LoginService, userService:UserService) { 
    this.loginService = loginService;
    this.userService = userService;
    
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     this.id = params['id'];
     this.datosUsuario(this.id);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  datosUsuario(username){
    if(this.loginService.isLogged){
      this.userService.datosUsuario(username)
      .subscribe(
        response =>{
          this.datosUser = response;
          if(this.datosUser.estado == "desactivada"){
            this.chosenItem = this.estado[2].value;
          }else if(this.datosUser.estado == "activada"){
            this.chosenItem = this.estado[1].value;
          }else{
            this.chosenItem = this.estado[0].value;
          }

          if(this.datosUser.rol == "administrador"){
            this.chosenItem2 = this.rol[0].value;
          }else if(this.datosUser.rol == "medico"){
            this.chosenItem2 = this.rol[1].value;
          }else{
            this.chosenItem2 = this.rol[2].value;
          }

          if(this.datosUser.especialidad == "migranas"){
            this.chosenItem3 = this.enfermedades[0].value;
          }else if(this.datosUser.especialidad == "diabetes"){
            this.chosenItem3 = this.enfermedades[1].value;
          }else{
            this.chosenItem3 = this.enfermedades[2].value;
          }

          this.makeCards();
          if(this.datosUser.rol == "paciente"){
            this.todosMedicos();
          }
          console.log(this.datosUser);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  todosMedicos(){
    if(this.loginService.isLogged){
      this.userService.todosMedicos()
      .subscribe(
        response =>{
          for (let i in response) {
            this.medico.push(new Medico(response[i]['username'], response[i]['id']));
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  makeCards(){
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Usuario', cols: 1, rows: 2, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
          ];
        }
  
        if(this.datosUser.rol == 'medico')
        var obj = [
          { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
          { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
          { title: 'especialidad', cols: 1, rows: 1, cuerpo: "hola"}
        ];
        if(this.datosUser.rol == 'paciente'){
          var obj = [
            { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
          ];
        }
        if(this.datosUser.rol == 'administrador'){
          var obj = [
            { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionRol', cols: 1, rows: 1, cuerpo: "hola"},
          ];
        }
        
  
        return obj;
      })
    );
  }

  openDialog(datosUser, rol): void {
    const dialogRef = this.dialog.open(DialogoEliminarUsuarioVista, {
      width: '400px',
      data: {name: datosUser.username, rol: rol, id: datosUser.id, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.respuesta == "Si"){
        this.eliminarUsuario(datosUser.id, datosUser.rol, datosUser.username);
      }
    });
  }

  openDialog2(): void {
    if(this.datosUser.rol == 'administrador'){
      const dialogRef = this.dialog.open(DialogoEditarUsuario, {
        width: '500px',
        data: {
          id: this.datosUser.id,
          username: this.datosUser.username,
          password: this.datosUser.password,
          email: this.datosUser.email, 
          nombre: this.datosUser.nombre, 
          apellidos: this.datosUser.apellidos, 
          telefono: this.datosUser.telefono, 
          dni: this.datosUser.dni,
          poblacion: this.datosUser.poblacion,
          rol: this.datosUser.rol
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.editarUser(result);
      });
    }else if(this.datosUser.rol == "medico"){
        const dialogRef = this.dialog.open(DialogoEditarUsuario, {
          width: '500px',
          data: {
            id: this.datosUser.id,
            username: this.datosUser.username,
            email: this.datosUser.email, 
            password: this.datosUser.password,
            nombre: this.datosUser.nombre, 
            apellidos: this.datosUser.apellidos, 
            telefono: this.datosUser.telefono, 
            dni: this.datosUser.dni,
            colegiado: this.datosUser.colegiado,
            poblacion: this.datosUser.poblacion,
            especialidad: this.datosUser.especialidad,
            cargo: this.datosUser.cargo,
            rol: this.datosUser.rol
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.editarUser(result);
        });
      }
    }

  eliminarUsuario(id, rol, username){
      
    this.userService.eliminarUser(id)
      .subscribe(
        response =>{console.log(response)
            this.openSnackBar("Se ha eliminado el usuario: \""+username+"\" con rol \""+rol+"\"");
            if(this.loginService.loggedUser.rol == "administrador"){
              this.router.navigateByUrl("/dashboardHome");
            }else{
              this.router.navigateByUrl("/dashboardMedico");
            }
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el usuario:" +username);}
      );
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionVistaUserComponent, {
      duration: 4 * 1000, data: mensaje
    });
  }

  cambiarEstado(valor){
    if(this.loginService.isLogged){
      this.userService.editarEstado(valor, this.datosUser)
      .subscribe(
        response =>{
          this.datosUsuario(this.id);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cambiarRol(valor){
    if(this.loginService.isLogged){
      this.userService.editarRol(valor, this.datosUser)
      .subscribe(
        response =>{
          this.datosUsuario(this.id);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cambiarEspecialidad(valor){
    if(this.loginService.isLogged){
      this.userService.editarEspecialidad(valor, this.datosUser)
      .subscribe(
        response =>{
          console.log(response);
          this.datosUsuario(this.id);
          this.openSnackBar("Se actualizado los datos con éxito");
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  editarUser(user){
    if(this.loginService.isLogged){
      this.userService.editarUser(user)
      .subscribe(
        response =>{
          this.datosUsuario(this.id);
          this.openSnackBar("Se actualizado los datos con éxito");
        },
        error => {
          console.log(error);
          this.openSnackBar("Error al actualizar los datos");
        }
      );
    }
  }


}
