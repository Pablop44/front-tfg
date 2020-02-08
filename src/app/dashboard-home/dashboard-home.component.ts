import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Consultas', cols: 1, rows: 1, cuerpo: 'cuerpo1'},
          { title: 'Usuarios', cols: 1, rows: 1, cuerpo: 'cuerpo2' },
          { title: 'Medicamentos', cols: 1, rows: 1, cuerpo: 'cuerpo3' },
          { title: 'Fichas', cols: 1, rows: 1, cuerpo: 'cuerpo4' }
        ];
      }

      return [
        { title: 'Consultas', cols: 2, rows: 1, cuerpo: 'cuerpo1' },
        { title: 'Usuarios', cols: 1, rows: 2, cuerpo: 'cuerpo2' },
        { title: 'Medicamentos', cols: 1, rows: 2, cuerpo: 'cuerpo3' },
        { title: 'Fichas', cols: 2, rows: 2, cuerpo: 'cuerpo4' },
        { title: 'Notas', cols: 1, rows: 1 },
        { title: 'Enfermedades', cols: 1, rows: 1, cuerpo: 'cuerpo5' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
