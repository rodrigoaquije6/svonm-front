import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { MonturaComponent } from './components/montura/montura.component';
import { LunaComponent } from './components/luna/luna.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { TipoComponent } from './components/tipoProducto/tipo/tipo.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard-gerente', component: DashboardGerenteComponent},
  { path: 'dashboard-trabajador', component: DashboardTrabajadorComponent},
  { path: 'dashboard-gerente/trabajador', component: TrabajadorComponent},
  { path: 'dashboard-gerente/rol', component: RolComponent},
  { path: 'dashboard-gerente/montura', component: MonturaComponent},
  { path: 'dashboard-gerente/luna', component: LunaComponent},
  { path: 'dashboard-gerente/marca', component: MarcaComponent},
  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent},
  //--------------------------------------------CREAR--------------------------------------------
  { path: 'dashboard-gerente/rol/crear-rol', component: CrearRolComponent},
  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
