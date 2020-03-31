import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from './users/users.component';
import { FichaIndividualComponent } from './ficha-individual/ficha-individual.component';
import { element } from 'protractor';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { DashboardMedicoComponent } from './dashboard-medico/dashboard-medico.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { HistorialComponent } from './historial/historial.component';
import { InformeDiabetes } from './models/InformeDiabetes';
import { InformeMigranasComponent } from './informe-migranas/informe-migranas.component';
import { InformeDiabetesComponent } from './informe-diabetes/informe-diabetes.component';
import { InformeAsmaComponent } from './informe-asma/informe-asma.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'dashboardHome', component: DashboardHomeComponent },
  { path: 'dashboardMedico', component: DashboardMedicoComponent },
  { path: 'users', component: UsersComponent },
  { path: 'ficha-individual/:id', component : FichaIndividualComponent,},
  { path: 'vista-usuario/:id', component : VistaUsuarioComponent,},
  { path: 'medicamentos', component : MedicamentosComponent,},
  { path: 'historial', component : HistorialComponent,},
  { path: 'diabetes/:id', component : InformeDiabetesComponent,},
  { path: 'migranas/:id', component : InformeMigranasComponent,},
  { path: 'asma/:id', component : InformeAsmaComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
