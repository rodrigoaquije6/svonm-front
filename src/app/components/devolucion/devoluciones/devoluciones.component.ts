import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent {
  listVentasFinalizadas: any[] = [];

  terminoBusqueda: string = '';

  constructor(private _ventaService: VentaService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    const treintaDiasAtras = new Date();
    treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30); // Restar 30 días a la fecha actual

    this._ventaService.getVentas().subscribe((data: any) => {
      console.log(data);
      if (data && data.ventasConDetalles) {
        const ventasFiltradas = data.ventasConDetalles.filter((venta: any) => {
          const fechaCreacion = new Date(venta.venta.fechaCreacion);
          return (
            (venta.venta.estado === 'Finalizada' || venta.venta.estado === 'Cambio Solicitado' || venta.venta.estado === 'Reembolsada') &&
            fechaCreacion >= treintaDiasAtras
          );
        });

        // Filtrar por término de búsqueda
        this.listVentasFinalizadas = ventasFiltradas.filter((venta: any) =>
          venta.venta.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          venta.venta.idCliente.nombres.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          venta.venta.idCliente.apellidos.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      }
    }, error => {
      console.log(error);
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.obtenerVentas();
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
