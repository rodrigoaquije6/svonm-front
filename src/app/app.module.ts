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
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { MonturaComponent } from './components/montura/montura.component';
import { LunaComponent } from './components/luna/luna.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './interceptors/token-interceptor.service.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGerenteComponent,
    DashboardTrabajadorComponent,
    LoginComponent,
    TrabajadorComponent,
    RolComponent,
    MonturaComponent,
    LunaComponent,
    MarcaComponent,
    CrearRolComponent
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
