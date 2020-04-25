import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { LoginService } from 'src/services/login.service';
import { User } from 'src/app/models/User';
import { Cuenta } from 'src/app/models/Cuenta';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private restUrl = 'http://localhost:8765';  

  constructor(private http: HttpClient, private router: Router, private loginService : LoginService) { 

  }

  todosUsuarios(){
    return this.http.get(this.restUrl+"/user/usuarios.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  usuariosAutorizar(){
    return this.http.get(this.restUrl+"/user/userActivados.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  eliminarUser(id){
    return this.http.delete(this.restUrl+"/user/delete/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  autorizarUser(id){
    return this.http.get(this.restUrl+"/user/autorizar/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  datosUsuario(id){
    return this.http.get(this.restUrl+"/user/view/"+id+".json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  todosMedicos(){
    return this.http.get(this.restUrl+"/user/todosMedicos.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  peticionesAutorizar(){
    console.log("sid");
    return this.http.get(this.restUrl+"/user/longitudUserActivados.json", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public editarEstado(id, valorCuenta){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

    let array = [
      {
        Field: 'id',
        Value: id
      },
      {
        Field: 'valorCuenta',
        Value: valorCuenta
      }
      ];
      let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);

    console.log(json);

      return this.http.post(this.restUrl+"/user/editCuentaEstado.json", json,
       httpOptions);
  }

  public editarEspecialidad(valor, user){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

    const userToSend : User = {
      id: user.id,
      dni: user.dni,
      username: user.username,
      password: user.password,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      poblacion: user.poblacion,
      colegiado: user.colegiado,
      cargo: user.cargo,
      especialidad: valor,
      cuenta: null,
      rol: user.rol,
    }


    return this.http.post(this.restUrl+"/user/editarUser.json", JSON.stringify(userToSend)
    , httpOptions);
  }

  public editarUser(user){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

    const userToSend : User = {
      id: user.id,
      dni: user.dni,
      username: user.username,
      password: user.password,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      poblacion: user.poblacion,
      colegiado: user.colegiado,
      cargo: user.cargo,
      especialidad: user.especialidad,
      cuenta: null,
      rol: user.rol,
    }

    return this.http.post(this.restUrl+"/user/editarUser.json", JSON.stringify(userToSend)
    , httpOptions);
  }



  public getMedicos(pagina, aMostrar, tipo){

    if(tipo == null){
  
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/user/getMedicos.json", json,
         httpOptions);
    }else{
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        }
        ,
        {
          Field: 'tipo',
          Value: tipo
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/user/getMedicos.json", json,
         httpOptions);
      }    
    }


  public getPacientes(pagina, aMostrar, tipo){

    if(tipo == null){
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/user/getPacientes.json", json,
         httpOptions);
    }else{
      let array = [
        {
          Field: 'page',
          Value: pagina
        },
        {
          Field: 'limit',
          Value: aMostrar
        }
        ,
        {
          Field: 'tipo',
          Value: tipo
        }
        ];
        let obj = {};
      array.forEach(item => obj[item.Field] = item.Value);
      
      let json = JSON.stringify(obj);
  
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loginService.loggedUser.password
        })
      };
  
        return this.http.post(this.restUrl+"/user/getPacientes.json", json,
         httpOptions);
      }    
    }

    public getAdministradores(pagina, aMostrar, tipo){

      if(tipo == null){
        let array = [
          {
            Field: 'page',
            Value: pagina
          },
          {
            Field: 'limit',
            Value: aMostrar
          }
          ];
          let obj = {};
        array.forEach(item => obj[item.Field] = item.Value);
        
        let json = JSON.stringify(obj);
    
        const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.loginService.loggedUser.password
          })
        };
    
          return this.http.post(this.restUrl+"/user/getAdministradores.json", json,
           httpOptions);
      }else{
        let array = [
          {
            Field: 'page',
            Value: pagina
          },
          {
            Field: 'limit',
            Value: aMostrar
          }
          ,
          {
            Field: 'tipo',
            Value: tipo
          }
          ];
          let obj = {};
        array.forEach(item => obj[item.Field] = item.Value);
        
        let json = JSON.stringify(obj);
    
        const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.loginService.loggedUser.password
          })
        };
    
          return this.http.post(this.restUrl+"/user/getAdministradores.json", json,
           httpOptions);
        }    
      }

      getNumeroAdministradores(){
        return this.http.get(this.restUrl+"/user/getNumeroAdministradores.json", {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loginService.loggedUser.password
          })
        });
      }

      getNumeroPacientes(){
        return this.http.get(this.restUrl+"/user/getNumeroPacientes.json", {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loginService.loggedUser.password
          })
        });
      }

      getNumeroMedicos(){
        return this.http.get(this.restUrl+"/user/getNumeroMedicos.json", {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loginService.loggedUser.password
          })
        });
      }

}
