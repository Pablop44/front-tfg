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
import { AppComponent } from '../app.component';
import { FichaService } from 'src/services/ficha.service';
import { FichaEnfermedadService } from 'src/services/ficha-enfermedad.service';

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

  errorUsername: Boolean;
  errorPassword: Boolean;
  errorEmail: Boolean;
  errorNombre: Boolean;
  errorApellidos: Boolean;
  errorTelefono: Boolean;
  errorPoblacion: Boolean;
  errorColegiado: Boolean;
  errorCargo: Boolean;


  constructor(
    public dialogRef: MatDialogRef<DialogoEditarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  validarUsername(){
    if(this.data.username != null){
      var nameRegex = /^[a-zA-Z0-9\-]+$/;
      if(nameRegex.test(this.data.username) === true){
        this.errorUsername = false;
      }else{
        this.errorUsername = true;
      }
    }else{
      this.errorUsername = true;
    }
  }

  validarEmail(){
    if(this.data.email != null){
      var nameRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if(nameRegex.test(this.data.email) === true){
        this.errorEmail = false;
      }else{
        this.errorEmail = true;
      }
    }else{
      this.errorEmail = true;
    }
  }

  validarApellidos(){
    if(this.data.apellidos != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data.apellidos) === true){
        this.errorApellidos = false;
      }else{
        this.errorApellidos = true;
      }
    }else{
      this.errorApellidos = true;
    }
  }

  validarPoblacion(){
    if(this.data.poblacion != null){
      var nameRegex =/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data.poblacion) === true){
        this.errorPoblacion = false;
      }else{
        this.errorPoblacion = true;
      }
    }else{
      this.errorPoblacion = true;
    }
  }


  validarPassword(){
    if(this.data.password != null){
      var nameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{1,30}$/;
      if(nameRegex.test(this.data.password) === true){
        this.errorPassword = false;
        return true;
      }else{
        this.errorPassword = true;
        return false;
      }
    }else{
      this.errorPassword = false;
    }
  }

  validarTelefono(){
    if(this.data.telefono != null){
      var nameRegex = /^([9,7,6]{1})+([0-9]{8})$/;
      if(nameRegex.test(this.data.telefono) === true){
        this.errorTelefono= false;
      }else{
        this.errorTelefono = true;
      }
    }else{
      this.errorTelefono= true;
    }
  }

  validarNombre(){
    if(this.data.nombre != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(this.data.nombre) === true){
        this.errorNombre = false;
      }else{
        this.errorNombre = true;
      }
    }else{
      this.errorNombre = true;
    }
  }

  validarColegiado(){
    if(this.data.colegiado != null){
      var nameRegex = /^([0-9\-]){9}$/;
      if(nameRegex.test(this.data.colegiado.toString()) === true){
        this.errorColegiado = false;
      }else{
        this.errorColegiado = true;
      }
    }else{
      this.errorColegiado = true;
    }
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
  fichaService: FichaService;
  fichaEnfermedadService: FichaEnfermedadService;
  datosUser: any = [];
  myForm : FormBuilder;
  appComponent:AppComponent;
  idFicha: string;
  idMedico: string;
  nombreMedico;

  medico: Medico[] = [];

  diabetes = "";
  asma = "";
  migranas = "";

  tieneAsma;
  tieneDiabetes;
  tieneMigranas;

  date;

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

  constructor(private fb: FormBuilder,private breakpointObserver: BreakpointObserver,private _snackBar: MatSnackBar,private router : Router, public dialog: MatDialog,
     private route : ActivatedRoute,loginService:LoginService, userService:UserService, appComponent: AppComponent, fichaService: FichaService,
     fichaEnfermedadService: FichaEnfermedadService) { 
    this.loginService = loginService;
    this.userService = userService;
    this.appComponent = appComponent;
    this.fichaService = fichaService;
    this.fichaEnfermedadService = fichaEnfermedadService;
    this.idMedico = "";
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
          console.log(response);
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
            this.getFichaPaciente();
          }
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
          for (let i in this.medico) {
            if(this.medico[i]['id'] == this.idMedico){
              this.nombreMedico = this.medico[i]['nombre'];
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cambiarMedicoAsignado(idMedico){
    if(this.loginService.isLogged){
      this.fichaService.cambiarMedico(idMedico, this.idFicha)
      .subscribe(
        response =>{
          for (let i in this.medico) {
            if(this.medico[i]['id'] == response['medico']){
              this.idMedico = this.medico[i]['id'];
              this.nombreMedico = this.medico[i]['nombre'];
              this.openSnackBar("Se ha actualizado el medico con éxito");
            }
          }
        },
        error => {
          console.log(error);
          this.openSnackBar("No se ha podido actualizar el medico");
        }
      );
    }
  }

  getFichaPaciente(){
    if(this.loginService.isLogged){
      this.fichaService.getFichaPaciente(this.datosUser.id)
      .subscribe(
        response =>{   
          this.tieneDiabetes = false;
          this.tieneAsma = false;
          this.tieneMigranas = false;
          this.diabetes = "";
          this.migranas = "";
          this.asma = "";
          this.idMedico = response[0]['medico'];
          if(this.loginService.loggedUser.rol == "medico"){
            if(this.loginService.loggedUser.id != response[0]['medico']){
              this.router.navigateByUrl("/dashboardMedico");
            }
          }else{
            this.idFicha = response[0]['id'];      
            this.enfermedades = response[0]['enfermedad'];
            for(const element in this.enfermedades){
              if(this.enfermedades[element] == "diabetes"){
                this.diabetes = "Diabetes";
                this.tieneDiabetes = true;
              }
              else if(this.enfermedades[element] == "asma"){
                this.asma = "Asma";
                this.tieneAsma = true;
              }
              else{
                this.migranas = "Migrañas";
                this.tieneMigranas = true;
              }
            }
            this.todosMedicos();
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
            { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"}
          ];
        }
  
        if(this.datosUser.rol == 'medico'){
          var obj = [
            { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
            { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            { title: 'especialidad', cols: 1, rows: 1, cuerpo: "hola"}
          ];
        }
        if(this.datosUser.rol == 'paciente'){
          if(this.loginService.loggedUser.rol == "administrador"){
            var obj = [
              { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
              { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'cambiarMedico', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'enfermedades', cols: 1, rows: 1, cuerpo: "hola"},
            ];
          }else{
            var obj = [
              { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
              { title: 'enfermedades', cols: 1, rows: 1, cuerpo: "hola"},
            ];
          }
        }
        if(this.datosUser.rol == 'administrador'){
          if(this.loginService.loggedUser.rol == "administrador"){
            var obj = [
              { title: 'Usuario', cols: 1, rows: 5, cuerpo: "hola"},
              { title: 'editar', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'eliminar', cols: 1, rows: 1, cuerpo: "hola"},
              { title: 'accionCuenta', cols: 1, rows: 1, cuerpo: "hola"},
            ];
          }
        }
        return obj;
      })
    );
  }

  openDialogEliminar(datosUser, rol): void {
    const dialogRef = this.dialog.open(DialogoEliminarUsuarioVista, {
      width: '400px',
      data: {name: datosUser.username, rol: rol, id: datosUser.id, respuesta: "Si"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result.respuesta == "Si"){
          this.eliminarUsuario(datosUser.id, datosUser.rol, datosUser.username);
        }
      }
    });
  }

  openDialogEditarUsuario(): void {
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
        if(result != undefined){
          this.editarUser(result);
        }
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
          if(result != undefined){
            this.editarUser(result);
          }
        });
      }else{
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
            poblacion: this.datosUser.poblacion,
            rol: this.datosUser.rol
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result != undefined){
            this.editarUser(result);
          }
        });
      }
    }

  eliminarUsuario(id, rol, username){
    this.userService.eliminarUser(id)
      .subscribe(
        response =>{
            this.openSnackBar("Se ha eliminado el usuario: \""+username+"\" con rol \""+rol+"\"");
            this.appComponent.peticionesAutorizar();
            if(this.loginService.loggedUser.rol == "administrador"){
              this.router.navigateByUrl("/dashboardHome");
            }else{
              this.router.navigateByUrl("/dashboardMedico");
            }
          },
        error => {console.log(error)
          this.openSnackBar("No se ha podido eliminar el usuario:" +username);
        }
      );
  }

  openSnackBar(mensaje: String) {
    this._snackBar.openFromComponent(notificacionVistaUserComponent, {
      duration: 4 * 1000, data: mensaje
    });
  }

  cambiarEstado(valor){
    if(this.loginService.isLogged){
      this.userService.editarEstado(this.datosUser.id, valor)
      .subscribe(
        response =>{
          this.datosUsuario(this.id);
          this.openSnackBar("Se ha actualizado el estado de la cuenta");
        },
        error => {
          console.log(error);
          this.openSnackBar("No se ha actualizado el estado de la cuenta");
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
      if(this.validar(user)){
        this.userService.editarUser(user)
        .subscribe(
          response =>{
            this.datosUsuario(user.id);
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

  validar(usuario): Boolean{
    return  (this.validarUsername(usuario) && 
    this.validarPoblacion(usuario) && this.validarPassword(usuario) && this.validarNombre(usuario) &&
    this.validarColegiado(usuario) && this.validarTelefono(usuario) && this.validarEmail(usuario)
    && this.validarApellidos(usuario));
  }

  validarUsername(usuario): Boolean{
    if(usuario.username != null){
      var nameRegex = /^[a-zA-Z0-9\-]+$/;
      if(nameRegex.test(usuario.username) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del nombre");
        return false;
      }
    }else{
      this.openSnackBar("El nombre debe estar cubierto");
      return false;
    }
  }

  validarEmail(usuario): Boolean{
    if(usuario.email != null){
      var nameRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if(nameRegex.test(usuario.email) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del email");
        return false;
      }
    }else{
      this.openSnackBar("El email debe estar cubierto");
      return false;
    }
  }

  validarApellidos(usuario): Boolean{
    if(usuario.apellidos != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(usuario.apellidos) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato de los apellidos");
        return false;
      }
    }else{
      this.openSnackBar("Los apellidos deben etar cubiertos");
      return false;
    }
  }

  validarPoblacion(usuario): Boolean{
    if(usuario.poblacion != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(usuario.poblacion) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato de la población");
        return false;
      }
    }else{
      this.openSnackBar("La población debe estar cubierta");
      return false;
    }
  }


  validarPassword(usuario): Boolean{
    if(usuario.password != null){
      var nameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{1,30}$/;
      if(nameRegex.test(usuario.password) === true){
        return true;
      }else{
        this.openSnackBar("La contraseña debe tener una mayúscula, minúscula y un signo");
        return false;
      }
    }else{
      return true;
    }
  }

  validarTelefono(usuario): Boolean{
    if(usuario.telefono != null){
      var nameRegex = /^([9,7,6]{1})+([0-9]{8})$/;
      if(nameRegex.test(usuario.telefono) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del teléfono");
        return false;
      }
    }else{
      this.openSnackBar("El teléfono debe estar cubierto");
      return false;
    }
  }

  validarNombre(usuario): Boolean{
    if(usuario.nombre != null){
      var nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(nameRegex.test(usuario.nombre) === true){
        return true;
      }else{
        this.openSnackBar("Error en el formato del nombre");
        return false;
      }
    }else{
      this.openSnackBar("El nombre debe estar cubierto");
      return false;
    }
  }

  validarColegiado(usuario): Boolean{
    if(this.datosUser.rol != "administrador" && this.datosUser.rol != "paciente"){
      if(usuario.colegiado != null){
        var nameRegex = /^([0-9\-]){9}$/;
        if(nameRegex.test(usuario.colegiado.toString()) === true){
          return true;
        }else{
          this.openSnackBar("Error en el formato del número de colegiado");
          return false;
        }
      }else{
        this.openSnackBar("El número de colegiado debe estar cubierto");
        return false;
      }
    }else{
      return true;
    }
  }

  checkValueAsma(event: any){
    if(this.loginService.isLogged){ 
      console.log(event)
      if(event== "true"){
        this.fichaEnfermedadService.anadirEnfermedad(this.idFicha, "asma")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }else{
        this.fichaEnfermedadService.eliminarEnfermedad(this.idFicha, "asma")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }  
    }
  }

  checkValueMigranas(event: any){
    if(this.loginService.isLogged){ 
      console.log(event)
      if(event== "true"){
        this.fichaEnfermedadService.anadirEnfermedad(this.idFicha, "migranas")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }else{
        this.fichaEnfermedadService.eliminarEnfermedad(this.idFicha, "migranas")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }  
    }
  }

  checkValueDiabetes(event: any){
    if(this.loginService.isLogged){ 
      console.log(event)
      if(event== "true"){
        this.fichaEnfermedadService.anadirEnfermedad(this.idFicha, "diabetes")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }else{
        this.fichaEnfermedadService.eliminarEnfermedad(this.idFicha, "diabetes")
        .subscribe(
          response =>{
            this.datosUsuario(this.id);
            this.openSnackBar("Se actualizado los datos con éxito");
          },
          error => {
            this.datosUsuario(this.id);
            this.openSnackBar("Error al actualizar los datos");
          }
        );
      }  
    }
  }
  
}
