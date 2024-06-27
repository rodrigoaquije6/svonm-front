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
import { DevolucionesComponent } from './components/devolucion/devoluciones/devoluciones.component';
import { RegistrarDevolucionComponent } from './components/devolucion/registrar-devolucion/registrar-devolucion.component';
import { VentasComponent } from './components/seguimiento-venta/ventas/ventas.component';
import { DetalleVentaComponent } from './components/seguimiento-venta/detalle-venta/detalle-venta.component';
import { DetalleCompraComponent } from './components/compra/detalle-compra/detalle-compra.component';
import { DetalleDevolucionComponent } from './components/devolucion/detalle-devolucion/detalle-devolucion.component';
import { ClientesComponent } from './components/cliente/clientes/clientes.component';
import { AuthGuard } from './guard/auth.guard';
import { ProveedoresComponent } from './components/proveedor/proveedores/proveedores.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { TipoLunasComponent } from './components/tipoLunas/tipo-lunas/tipo-lunas.component';
import { CrearTipoLunasComponent } from './components/tipoLunas/crear-tipo-lunas/crear-tipo-lunas.component';
import { CrearTratamientoComponent } from './components/tratamiento/crear-tratamiento/crear-tratamiento.component';
import { TratamientosComponent } from './components/tratamiento/tratamientos/tratamientos.component';
import { VerProductoComponent } from './components/gestionar-producto/ver-producto/ver-producto.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  //DASHBOARD-GERENTE
  { path: 'dashboard-gerente', component: DashboardGerenteComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/trabajador', component: TrabajadorComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/rol', component: RolComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/luna', component: LunaComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/marca', component: MarcaComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/gestionar-producto', component: GestionarProductoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/almacen', component: AlmacenComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/catalogo', component: CatalogoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tipoProducto', component: TipoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/ingresos', component: ComprasComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/proveedor', component: ProveedoresComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tipoLuna', component: TipoLunasComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tratamiento', component: TratamientosComponent, canActivate: [AuthGuard], data: { role: '1' }},

  //DASHBOARD-TRABAJADOR
  { path: 'dashboard-trabajador', component: DashboardTrabajadorComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/venta', component: VentaComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/seguimiento-venta', component: VentasComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/devolucion', component: DevolucionesComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/cliente', component: ClientesComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/ver-producto', component: VerProductoComponent, canActivate: [AuthGuard], data: { role: '2' }},

  //------------------------------------------GESTIONAR------------------------------------------
  //DASHBOARD-GERENTE
  { path: 'dashboard-gerente/rol/crear-rol', component: CrearRolComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/rol/editar-rol/:id', component: CrearRolComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/marca/crear-marca', component: CrearMarcaComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/marca/editar-marca/:id', component: CrearMarcaComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/trabajador/crear-trabajador', component: CrearTrabajadorComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/trabajador/editar-trabajador/:id', component: CrearTrabajadorComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/luna/crear-luna', component: CrearLunaComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/luna/editar-luna/:id', component: CrearLunaComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/tipoProducto/crear-tipoProducto', component: CrearTipoProductoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tipoProducto/editar-tipoProducto/:id', component: CrearTipoProductoComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/gestionar-producto/crear-producto', component: CrearProductoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/gestionar-producto/editar-montura/:id', component: EditarMonturaComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/gestionar-producto/editar-lente-sol/:id', component: EditarLenteSolComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/gestionar-producto/editar-otro/:id', component: EditarOtroComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/gestionar-producto/editar/:id', component: EditarOtroComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/ingresos/registrar-ingreso', component: RegistrarCompraComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/ingresos/detalle-ingreso/:id', component: DetalleCompraComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/proveedor/crear-proveedor', component: CrearProveedorComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/proveedor/editar-proveedor/:id', component: CrearProveedorComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/tipoLuna/crear-tipo-luna', component: CrearTipoLunasComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tipoLuna/editar-tipo-luna/:id', component: CrearTipoLunasComponent, canActivate: [AuthGuard], data: { role: '1' }},

  { path: 'dashboard-gerente/tratamiento/crear-tratamiento', component: CrearTratamientoComponent, canActivate: [AuthGuard], data: { role: '1' }},
  { path: 'dashboard-gerente/tratamiento/editar-tratamiento/:id', component: CrearTratamientoComponent, canActivate: [AuthGuard], data: { role: '1' }},
 
  //DASHBOARD-TRABAJADOR
  { path: 'dashboard-trabajador/venta/registrar-venta', component: RegistrarVentaComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/venta/detalle-venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard], data: { role: '2' }},

  { path: 'dashboard-trabajador/seguimiento-venta/detalle-venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard], data: { role: '2' }},

  { path: 'dashboard-trabajador/devolucion/registrar-devolucion/:id', component: RegistrarDevolucionComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/devolucion/detalle-devolucion/:id', component: DetalleDevolucionComponent, canActivate: [AuthGuard], data: { role: '2' }},
  { path: 'dashboard-trabajador/devolucion/detalle-venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard], data: { role: '2' }},

  { path: 'dashboard-trabajador/cliente/editar-cliente/:id', component: EditarClienteComponent, canActivate: [AuthGuard], data: { role: '2' }},


  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
