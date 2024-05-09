import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { TrabajadorComponent } from './components/trabajador/trabajadores/trabajador.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { MonturaComponent } from './components/monturas/montura/montura.component';
import { LunaComponent } from './components/lunas/luna/luna.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { CrearTrabajadorComponent } from './components/trabajador/crear-trabajador/crear-trabajador.component';
import { CrearMarcaComponent } from './components/marcas/crear-marca/crear-marca.component';
import { CrearMonturaComponent } from './components/monturas/crear-montura/crear-montura.component';
import { CrearLunaComponent } from './components/lunas/crear-luna/crear-luna.component';
import { TipoComponent } from './components/tipoProducto/tipo/tipo.component';
import { CrearTipoProductoComponent } from './components/tipoProducto/crear-tipo-producto/crear-tipo-producto.component';
import { AlmacenComponent } from './components/gestionarAlmacen/almacen/almacen.component';
import { EditarStockComponent } from './components/gestionarAlmacen/editar-stock/editar-stock.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard-gerente', component: DashboardGerenteComponent},
  { path: 'dashboard-trabajador', component: DashboardTrabajadorComponent},
  { path: 'dashboard-gerente/trabajador', component: TrabajadorComponent},
  { path: 'dashboard-gerente/rol', component: RolComponent},
  { path: 'dashboard-gerente/montura', component: MonturaComponent},
  { path: 'dashboard-gerente/luna', component: LunaComponent},
  { path: 'dashboard-gerente/almacen', component: AlmacenComponent},
  

  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent},
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

  { path: 'dashboard-gerente/tipoProducto/crear-tipoProducto', component: CrearTipoProductoComponent},
  { path: 'dashboard-gerente/tipoProducto/editar-tipoProducto/:id', component: CrearTipoProductoComponent},

  { path: 'dashboard-gerente/almacen/editar-stock/:id', component: EditarStockComponent},


  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
