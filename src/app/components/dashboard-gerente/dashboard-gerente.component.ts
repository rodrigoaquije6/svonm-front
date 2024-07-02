import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-dashboard-gerente',
  templateUrl: './dashboard-gerente.component.html',
  styleUrls: ['./dashboard-gerente.component.css']
})
export class DashboardGerenteComponent {
  isLoggedIn: boolean = this.api.isLogged();


  constructor(private api: LoginService,
              private router: Router,
              private _ventaService: VentaService) { }

  ngOnInit(): void {
  }

  generarCsvVentasDeHoy() {
    this._ventaService.generarCsvVentasDeHoy()
      .subscribe(
        data => {
          console.log('CSV generado:', data);
          // Aquí podrías manejar la descarga o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al generar CSV:', error);
          // Manejar errores como desees
        }
      );
  }

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
