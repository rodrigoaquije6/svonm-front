import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardGerenteComponent } from './components/dashboard-gerente/dashboard-gerente.component';
import { DashboardTrabajadorComponent } from './components/dashboard-trabajador/dashboard-trabajador.component';
import { LoginComponent } from './components/login/login.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGerenteComponent,
    DashboardTrabajadorComponent,
    LoginComponent,
    TrabajadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
