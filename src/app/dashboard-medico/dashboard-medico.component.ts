import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min';

@Component({
  selector: 'app-dashboard-medico',
  templateUrl: './dashboard-medico.component.html',
  styleUrls: ['./dashboard-medico.component.css']
})
export class DashboardMedicoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Diagrama de barras de los roles de lo usuarios"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
  }

}
