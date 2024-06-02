import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { LoginComponent } from './components/login/login.component';
import { TrabajadorComponent } from './components/trabajador/trabajadores/trabajador.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { LunaComponent } from './components/lunas/luna/luna.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { CrearTrabajadorComponent } from './components/trabajador/crear-trabajador/crear-trabajador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './interceptors/token-interceptor.service.service';
import { CrearMarcaComponent } from './components/marcas/crear-marca/crear-marca.component';
import { CrearLunaComponent } from './components/lunas/crear-luna/crear-luna.component';
import { GestionarProductoComponent } from './components/gestionar-producto/gestionar-productos/gestionar-producto.component';
import { CrearProductoComponent } from './components/gestionar-producto/crear-producto/crear-producto.component';
import { CrearTipoProductoComponent } from './components/tipoProducto/crear-tipo-producto/crear-tipo-producto.component';
import { TipoComponent } from './components/tipoProducto/tipo/tipo.component';
import { EditarMonturaComponent } from './components/gestionar-producto/editar-montura/editar-montura.component';
import { EditarLenteSolComponent } from './components/gestionar-producto/editar-lenteSol/editar-lente-sol.component';
import { EditarOtroComponent } from './components/gestionar-producto/editar-otro/editar-otro.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGerenteComponent,
    DashboardTrabajadorComponent,
    LoginComponent,
    TrabajadorComponent,
    RolComponent,
    LunaComponent,
    MarcaComponent,
    CrearRolComponent,
    CrearTrabajadorComponent,
    CrearMarcaComponent,
    CrearLunaComponent,
    GestionarProductoComponent,
    CrearProductoComponent,
    TipoComponent,
    CrearTipoProductoComponent,
    EditarMonturaComponent,
    EditarLenteSolComponent,
    EditarOtroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  // exports: [
  //   ReactiveFormsModule,
  //   FormsModule,
  // ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
