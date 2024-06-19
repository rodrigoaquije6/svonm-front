import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {
  listVenta: any[] = [];

  listProductoOriginal: Venta[] = [];

  terminoBusqueda: string = '';

  constructor(private _ventaService: VentaService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this._ventaService.getVentas().subscribe((data: any) => {
      console.log(data);
      if (data && data.ventasConDetalles) {
        this.listVenta = data.ventasConDetalles.filter((venta: any) =>
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
