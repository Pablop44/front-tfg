import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private restUrl = 'http://localhost:8765/consulta'; 
  public medico : string;

  constructor(private httpClient: HttpClient, private loginService : LoginService) { }

  public numeroConsultasTodas(){
    return this.httpClient.get(this.restUrl+`/numeroConsultasTodas.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public getConsultasHoy(id){
    return this.httpClient.get(this.restUrl+`/consultasHoy/`+id+`.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public getDatosConsulta(id){
    return this.httpClient.get(this.restUrl+`/view/`+id+`.json`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    });
  }

  public numeroConsultas(id,filtro){

    let array = [{
      Field: 'filtro',
      Value: filtro
    },
    {
      Field: 'id',
      Value: id
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

      return this.httpClient.post(this.restUrl+"/numeroConsultas.json", json,
       httpOptions);
  }

  public numeroConsultasMedico(medico,filtro){

    let array = [{
      Field: 'filtro',
      Value: filtro
    },
    {
      Field: 'medico',
      Value: medico
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

      return this.httpClient.post(this.restUrl+"/numeroConsultasMedico.json", json,
       httpOptions);
  }


  public consultasFicha(id, pagina, aMostrar, tipo, filtro){
    if(filtro.id == null && filtro.lugar == null && filtro.fechaFin == null && filtro.fechaInicio == null && filtro.diagnostico == null &&
     filtro.observaciones == null && filtro.tiempo == null && filtro.cancelada == null && filtro.aplazada == null && filtro.realizada == null){
      filtro = null;
    }

    if(tipo == null){
      let array = [{
        Field: 'id',
        Value: id
      },
      {
        Field: 'page',
        Value: pagina
      },
      {
        Field: 'limit',
        Value: aMostrar
      },
      {
        Field: 'filtro',
        Value: filtro
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

      return this.httpClient.post(this.restUrl+"/consultaFicha.json", json,
       httpOptions);

    }else{
      let array = [{
        Field: 'id',
        Value: id
      },
      {
        Field: 'page',
        Value: pagina
      },
      {
        Field: 'limit',
        Value: aMostrar
      }, 
      {
        Field: 'tipo',
        Value: tipo
      },
      {
        Field: 'filtro',
        Value: filtro
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

      return this.httpClient.post(this.restUrl+"/consultaFicha.json", json,
       httpOptions);
    }
  }


  public consultasMedico(idMedico, pagina, aMostrar, tipo, filtro){
    if(filtro.id == null && filtro.lugar == null && filtro.fechaFin == null && filtro.fechaInicio == null && filtro.diagnostico == null &&
     filtro.observaciones == null && filtro.tiempo == null && filtro.cancelada == null && filtro.aplazada == null && filtro.realizada == null){
      filtro = null;
    }

    if(tipo == null){
      let array = [{
        Field: 'medico',
        Value: idMedico
      },
      {
        Field: 'page',
        Value: pagina
      },
      {
        Field: 'limit',
        Value: aMostrar
      },
      {
        Field: 'filtro',
        Value: filtro
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

      return this.httpClient.post(this.restUrl+"/consultaMedico.json", json,
       httpOptions);

    }else{
      let array = [{
        Field: 'medico',
        Value: idMedico
      },
      {
        Field: 'page',
        Value: pagina
      },
      {
        Field: 'limit',
        Value: aMostrar
      }, 
      {
        Field: 'tipo',
        Value: tipo
      },
      {
        Field: 'filtro',
        Value: filtro
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

      return this.httpClient.post(this.restUrl+"/consultaMedico.json", json,
       httpOptions);
    }
  }


  public todasConsultas( pagina, aMostrar, tipo){

    if(tipo == null){
      let array = [
      {
        Field: 'page',
        Value: pagina
      },
      {
        Field: 'limit',
        Value: aMostrar
      },
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

      return this.httpClient.post(this.restUrl+"/consultas.json", json,
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
      }, 
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

      return this.httpClient.post(this.restUrl+"/consultaMedico.json", json,
       httpOptions);
    }
  }


  public getHoras(x){
    let array = [{
      Field: 'fecha',
      Value: x
    },
    {
      Field: 'medico',
      Value: this.medico
    }
    ];
    
    let obj = {};
    array.forEach(item => obj[item.Field] = item.Value);
    
    let json = JSON.stringify(obj);

    console.log(json);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

    return this.httpClient.post(this.restUrl+"/getHoras.json", json
    , httpOptions);
  }

  crearConsulta(datos){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

    return this.httpClient.post(this.restUrl+"/add.json", JSON.stringify(datos), httpOptions);
  }


  public editarConsulta(consulta){
    
    let json = JSON.stringify(consulta);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.loggedUser.password
      })
    };

      return this.httpClient.post(this.restUrl+"/editarConsulta.json", json,
       httpOptions);
  }
}
