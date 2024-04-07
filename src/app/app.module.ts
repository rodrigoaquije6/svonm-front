import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { LoginComponent } from './components/login/login.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { RolComponent } from './components/rol/rol.component';
import { MonturaComponent } from './components/montura/montura.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGerenteComponent,
    DashboardTrabajadorComponent,
    LoginComponent,
    TrabajadorComponent,
    RolComponent,
    MonturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
