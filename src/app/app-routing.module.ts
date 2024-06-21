import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { TrabajadorComponent } from './components/trabajador/trabajadores/trabajador.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { LunaComponent } from './components/lunas/luna/luna.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { AlmacenComponent } from './components/gestionarAlmacen/almacen/almacen.component';
import { GestionarProductoComponent } from './components/gestionar-producto/gestionar-productos/gestionar-producto.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { CrearTrabajadorComponent } from './components/trabajador/crear-trabajador/crear-trabajador.component';
import { CrearMarcaComponent } from './components/marcas/crear-marca/crear-marca.component';
import { CrearLunaComponent } from './components/lunas/crear-luna/crear-luna.component';
import { CrearProductoComponent } from './components/gestionar-producto/crear-producto/crear-producto.component';
import { CrearTipoProductoComponent } from './components/tipoProducto/crear-tipo-producto/crear-tipo-producto.component';
import { TipoComponent } from './components/tipoProducto/tipo/tipo.component';
import { EditarMonturaComponent } from './components/gestionar-producto/editar-montura/editar-montura.component';
import { EditarLenteSolComponent } from './components/gestionar-producto/editar-lenteSol/editar-lente-sol.component';
import { EditarOtroComponent } from './components/gestionar-producto/editar-otro/editar-otro.component';
import { CatalogoComponent } from './components/gestionarCatalogo/catalogo/catalogo.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { RegistrarVentaComponent } from './components/venta/registrar-venta/registrar-venta.component'
import { ComprasComponent } from './components/compra/compras/compras.component';
import { RegistrarCompraComponent } from './components/compra/registrar-compra/registrar-compra.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  //DASHBOARD-GERENTE
  { path: 'dashboard-gerente', component: DashboardGerenteComponent},
  { path: 'dashboard-trabajador', component: DashboardTrabajadorComponent},
  { path: 'dashboard-gerente/trabajador', component: TrabajadorComponent},
  { path: 'dashboard-gerente/rol', component: RolComponent},
  { path: 'dashboard-gerente/luna', component: LunaComponent},
  { path: 'dashboard-gerente/marca', component: MarcaComponent},
  { path: 'dashboard-gerente/gestionar-producto', component: GestionarProductoComponent},
  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent},
  { path: 'dashboard-gerente/almacen', component: AlmacenComponent},
  { path: 'dashboard-gerente/catalogo', component: CatalogoComponent},
  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent},
  { path: 'dashboard-gerente/ingresos', component: ComprasComponent},

  //DASHBOARD-TRABAJADOR
  { path: 'dashboard-trabajador/venta', component: VentaComponent},

  //------------------------------------------GESTIONAR------------------------------------------
  //DASHBOARD-GERENTE
  { path: 'dashboard-gerente/rol/crear-rol', component: CrearRolComponent},
  { path: 'dashboard-gerente/rol/editar-rol/:id', component: CrearRolComponent},

  { path: 'dashboard-gerente/marca/crear-marca', component: CrearMarcaComponent},
  { path: 'dashboard-gerente/marca/editar-marca/:id', component: CrearMarcaComponent},

  { path: 'dashboard-gerente/trabajador/crear-trabajador', component: CrearTrabajadorComponent},
  { path: 'dashboard-gerente/trabajador/editar-trabajador/:id', component: CrearTrabajadorComponent},

  { path: 'dashboard-gerente/luna/crear-luna', component: CrearLunaComponent},
  { path: 'dashboard-gerente/luna/editar-luna/:id', component: CrearLunaComponent},

  { path: 'dashboard-gerente/tipoProducto/crear-tipoProducto', component: CrearTipoProductoComponent},
  { path: 'dashboard-gerente/tipoProducto/editar-tipoProducto/:id', component: CrearTipoProductoComponent},

  { path: 'dashboard-gerente/gestionar-producto/crear-producto', component: CrearProductoComponent},
  { path: 'dashboard-gerente/gestionar-producto/editar-montura/:id', component: EditarMonturaComponent},
  { path: 'dashboard-gerente/gestionar-producto/editar-lente-sol/:id', component: EditarLenteSolComponent},
  { path: 'dashboard-gerente/gestionar-producto/editar-otro/:id', component: EditarOtroComponent},
  { path: 'dashboard-gerente/gestionar-producto/editar/:id', component: EditarOtroComponent},

  { path: 'dashboard-gerente/ingresos/registrar-ingreso', component: RegistrarCompraComponent},
  { path: 'dashboard-gerente/ingresos/editar-ingreso/:id', component: RegistrarCompraComponent},

  //DASHBOARD-TRABAJADOR
  { path: 'dashboard-trabajador/venta/registrar-venta', component: RegistrarVentaComponent},
  { path: 'dashboard-trabajador/venta/editar-venta/:id', component: RegistrarVentaComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
