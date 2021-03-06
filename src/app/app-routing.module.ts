import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from './users/users.component';
import { FichaIndividualComponent } from './ficha-individual/ficha-individual.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { HistorialComponent } from './historial/historial.component';
import { InformeMigranasComponent } from './informe-migranas/informe-migranas.component';
import { InformeDiabetesComponent } from './informe-diabetes/informe-diabetes.component';
import { InformeAsmaComponent } from './informe-asma/informe-asma.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { HistorialConsultaComponent } from './historial-consulta/historial-consulta.component';
import { IntructionsActivateComponent } from './intructions-activate/intructions-activate.component';
import { ActivatedUserComponent } from './activated-user/activated-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'dashboardHome', component: DashboardHomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'ficha-individual/:id', component : FichaIndividualComponent },
  { path: 'vista-usuario/:id', component : VistaUsuarioComponent },
  { path: 'medicamentos', component : MedicamentosComponent },
  { path: 'historial', component : HistorialComponent },
  { path: 'diabetes/:id', component : InformeDiabetesComponent },
  { path: 'migranas/:id', component : InformeMigranasComponent },
  { path: 'asma/:id', component : InformeAsmaComponent },
  { path: 'consulta/:id', component : ConsultaComponent },
  { path: 'tratamiento/:id', component : TratamientoComponent },
  { path: 'consultas', component : HistorialConsultaComponent },
  { path: 'intructionsActivate', component : IntructionsActivateComponent },
  { path: 'activatedUser/:id', component : ActivatedUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
