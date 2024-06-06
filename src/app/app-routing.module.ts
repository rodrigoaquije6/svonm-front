import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { TrabajadorComponent } from './components/trabajador/trabajadores/trabajador.component';
import { VentaComponent } from './components/venta/ventas/venta.component';
import { RegistrarVentaComponent } from './components/venta/registrar-venta/registrar-venta.component'

import { RolComponent } from './components/roles/rol/rol.component';
import { MonturaComponent } from './components/monturas/montura/montura.component';
import { LunaComponent } from './components/lunas/luna/luna.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { CrearTrabajadorComponent } from './components/trabajador/crear-trabajador/crear-trabajador.component';
import { CrearMarcaComponent } from './components/marcas/crear-marca/crear-marca.component';
import { CrearMonturaComponent } from './components/monturas/crear-montura/crear-montura.component';
import { CrearLunaComponent } from './components/lunas/crear-luna/crear-luna.component';
import { TipoLunaComponent } from './components/lunas/tipo-luna/tipo-luna.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard-gerente', component: DashboardGerenteComponent},
  { path: 'dashboard-trabajador', component: DashboardTrabajadorComponent},
  { path: 'dashboard-trabajador/venta', component: VentaComponent},
  { path: 'dashboard-trabajador/venta/registrar-venta', component: RegistrarVentaComponent},

  { path: 'dashboard-gerente/trabajador', component: TrabajadorComponent},
  { path: 'dashboard-gerente/rol', component: RolComponent},
  { path: 'dashboard-gerente/montura', component: MonturaComponent},
  { path: 'dashboard-gerente/luna', component: LunaComponent},
  { path: 'dashboard-gerente/marca', component: MarcaComponent},

  //--------------------------------------------CREAR--------------------------------------------
  { path: 'dashboard-gerente/rol/crear-rol', component: CrearRolComponent},
  { path: 'dashboard-gerente/rol/editar-rol/:id', component: CrearRolComponent},

  { path: 'dashboard-gerente/montura/crear-montura', component: CrearMonturaComponent},
  { path: 'dashboard-gerente/montura/editar-montura/:id', component: CrearMonturaComponent},

  { path: 'dashboard-gerente/marca/crear-marca', component: CrearMarcaComponent},
  { path: 'dashboard-gerente/marca/editar-marca/:id', component: CrearMarcaComponent},

  { path: 'dashboard-gerente/trabajador/crear-trabajador', component: CrearTrabajadorComponent},
  { path: 'dashboard-gerente/trabajador/editar-trabajador/:id', component: CrearTrabajadorComponent},

  { path: 'dashboard-gerente/luna/crear-luna', component: CrearLunaComponent},
  { path: 'dashboard-gerente/luna/editar-luna/:id', component: CrearLunaComponent},

  { path: 'dashboard-gerente/luna/tipo-luna', component: TipoLunaComponent},
  { path: 'dashboard-gerente/luna/editar-tipo-luna/:id', component: TipoLunaComponent},
  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
