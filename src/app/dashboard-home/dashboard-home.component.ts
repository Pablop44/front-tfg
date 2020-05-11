import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { StatisticsService } from 'src/services/statistics.service';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})

export class DashboardHomeComponent {
  
  loginService:LoginService;
  statisticsService: StatisticsService;
  appComponent: AppComponent;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Fichas', cols: 1, rows: 2, cuerpo: "hola"},
          { title: 'Consultas', cols: 1, rows: 2, cuerpo: "hola"},
          { title: 'EnfermedadesPorSexo', cols: 2, rows: 2, cuerpo: "hola"}
        ];
      }

      return [
        { title: 'Fichas', cols: 1, rows: 2, cuerpo: "hola"},
        { title: 'Consultas', cols: 1, rows: 2, cuerpo: "hola" },
        { title: 'EnfermedadesPorSexo', cols: 2, rows: 2, cuerpo: "hola"}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private router : Router,  statisticsService: StatisticsService,
    loginService:LoginService, appComponent:AppComponent) {
      this.appComponent = appComponent;
      this.loginService = loginService;
      this.statisticsService = statisticsService;
    }

  ngOnInit() {
    if(this.loginService.loggedUser.rol != "administrador"){
      this.router.navigateByUrl("/login");
    }else{
      this.appComponent.peticionesAutorizar();
      this.estadisticasUsuarios();
      this.estadisticaEnfermedades();
      this.estadisticaEnfermedadesPorSexo();
    }
  }

  estadisticasUsuarios(){
    if(this.loginService.isLogged){
      this.statisticsService.estadisticasUsuarios()
      .subscribe(
        response =>{
            this.crearDiagramaBarrasUsuarios(response);
            this.crearDiagramaCircularUsuarios(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  crearDiagramaBarrasUsuarios(response){
    let chart = new CanvasJS.Chart("diagramaBarrasUsuarios", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Diagrama de barras de los roles de lo usuarios"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: response['administradores'], label: "Administradores" },
          { y: response['medicos'], label: "Médicos" },
          { y: response['pacientes'], label: "Pacientes" },
        ]
      }]
    }); 
    chart.render();
  }

  crearDiagramaCircularUsuarios(response){
    let chart = new CanvasJS.Chart("diagramaCircularUsuarios", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Porcentaje de roles en el sistema"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: response['administradores'], name: "Administradores" },
          { y: response['medicos'], name: "Médicos" },
          { y: response['pacientes'], name: "Pacientes" },
        ]
      }]
    });
    chart.render();
  }


  estadisticaEnfermedades(){
    if(this.loginService.isLogged){
      this.statisticsService.estadisticasEnfermedades()
      .subscribe(
        response =>{
          this.crearDiagramaBarrasEnfermedades(response);
          this.crearDiagramaCircularEnfermedades(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  estadisticaEnfermedadesPorSexo(){
    if(this.loginService.isLogged){
      this.statisticsService.estadisticasEnfermedadesPorSexo()
      .subscribe(
        response =>{
          this.crearDiagramaCircularEnfermedadesPorSexoMigranas(response);
          this.crearDiagramaCircularEnfermedadesPorSexoDiabetes(response);
          this.crearDiagramaCircularEnfermedadesPorSexoAsma(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  crearDiagramaBarrasEnfermedades(response){
    let chart = new CanvasJS.Chart("diagramaBarrasEnfermedades", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Diagrama de barras de las Enfermedades"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: response['migranas'], label: "Migrañas" },
          { y: response['diabetes'], label: "Diabetes" },
          { y: response['asma'], label: "asma" },
        ]
      }]
    }); 
    chart.render();
  }

  crearDiagramaCircularEnfermedades(response){
    let chart = new CanvasJS.Chart("diagramaCircularEnfermedades", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Porcentaje de enfermedades en el sistema"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: response['migranas'], name: "Migrañas" },
          { y: response['diabetes'], name: "Diabetes" },
          { y: response['asma'], name: "asma" },
        ]
      }]
    });
    chart.render();
  }

  crearDiagramaCircularEnfermedadesPorSexoMigranas(response){
    let chart = new CanvasJS.Chart("diagramaCircularEnfermedadesPorSexoMigranas", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text:  "% Pacientes con Migranas por sexo"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: response['masculinoMigranas'], name: "Masculino con Migrañas" },
          { y: response['femeninoMigranas'], name: "Femenino con Migrañas" },
        ]
      }]
    });
    chart.render();
  }

  crearDiagramaCircularEnfermedadesPorSexoDiabetes(response){
    let chart = new CanvasJS.Chart("diagramaCircularEnfermedadesPorSexoDiabetes", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "% Pacientes con Diabetes por sexo"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: response['masculinoDiabetes'], name: "Masculino con Diabetes" },
          { y: response['femeninoDiabetes'], name: "Femenino con Diabetes" },
        ]
      }]
    });
      
    chart.render();
  }

  crearDiagramaCircularEnfermedadesPorSexoAsma(response){
    let chart = new CanvasJS.Chart("diagramaCircularEnfermedadesPorSexoAsma", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "% Pacientes con Asma por sexo"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: response['masculinoAsma'], name: "Masculino con Asma" },
          { y: response['femeninoAsma'], name: "Femenino con Asma" },
        ]
      }]
    });
      
    chart.render();
  }
}


  

  


