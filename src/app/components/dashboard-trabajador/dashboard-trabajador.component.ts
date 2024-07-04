import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { IngresoService } from 'src/app/services/ingreso.service';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-dashboard-trabajador',
  templateUrl: './dashboard-trabajador.component.html',
  styleUrls: ['./dashboard-trabajador.component.css']
})
export class DashboardTrabajadorComponent {
  isLoggedIn: boolean = this.api.isLogged();

  ventasConDetalles: any[] = [];
  ventasEnProceso: any[] = [];
  listVentas: Venta[] = [];

  totalVentasMes: number = 0;
  totalDevolucionesMes: number = 0;
  totalGananciasMes: number = 0;

  trabajadorId: string | undefined;

  constructor(private api: LoginService,
    private router: Router,
    private _ventaService: VentaService,
    private _ingresoService: IngresoService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerPerfilTrabajador();
    this.obtenerTotalVentasFinalizadasMesActual();
    this.obtenerTotalDevolucionesMesActual();
    this.obtenerTotalGananciasMesActual();
    this.obtenerVentasEnProceso();
  }

  obtenerPerfilTrabajador() {
    this.api.getProfile().subscribe(
      (profile) => {
        // Asignar el ID del trabajador automáticamente donde sea necesario
        this.trabajadorId = profile._id;
      },
      (error) => {
        console.error('Error al obtener el perfil del trabajador:', error);
        // Manejo de errores
      }
    );
  }

  obtenerTotalVentasFinalizadasMesActual() {
    this._ventaService.obtenerVentasMesActual().subscribe(
      (data: any) => {
        this.ventasConDetalles = data.ventas.filter((v: any) => {
          return v.estado === 'Finalizada' && v.idTrabajador._id === this.trabajadorId;
        });
        this.listVentas = this.ventasConDetalles.map((v: any) => v.venta);
        this.totalVentasMes = this.listVentas.length;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  obtenerTotalDevolucionesMesActual() {
    this._ventaService.obtenerVentasMesActual().subscribe(
      (data: any) => {
        this.ventasConDetalles = data.ventas.filter((v: any) => {
          return v.estado === 'Reembolsada' && v.idTrabajador._id === this.trabajadorId;
        });
        this.listVentas = this.ventasConDetalles.map((v: any) => v.venta);
        this.totalDevolucionesMes = this.listVentas.length;
        console.log('Ventas del mes actual:', this.totalDevolucionesMes);
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  obtenerTotalGananciasMesActual() {
    this._ventaService.obtenerVentasMesActual().subscribe(
      (data: any) => {
        // Verificar si data.ventas está correctamente poblado
        if (!data.ventas) {
          console.error('No hay ventas disponibles.');
          return;
        }
        // Filtrar solo las ventas finalizadas del trabajador específico
        const ventasFinalizadas = data.ventas.filter((v: any) => {
          return v.estado === 'Finalizada' && v.idTrabajador._id === this.trabajadorId;
        });

        // Filtrar solo las ventas reembolsadas del trabajador específico
        const ventasReembolsadas = data.ventas.filter((v: any) => {
          return v.estado === 'Reembolsada' && v.idTrabajador._id === this.trabajadorId;
        });

        // Calcular los totales
        const totalFinalizadas = ventasFinalizadas.reduce((total: number, venta: any) => total + venta.total, 0);
        const totalReembolsadas = ventasReembolsadas.reduce((total: number, venta: any) => total + venta.total, 0);

        // Calcular las ganancias netas
        this.totalGananciasMes = totalFinalizadas - totalReembolsadas;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  obtenerVentasEnProceso() {
    this._ventaService.getVentas().subscribe(
      (data: any) => {
        if (!data || !data.ventasConDetalles || data.ventasConDetalles.length === 0) {
          console.error('No hay ventas disponibles.');
          return;
        }

        // Filtrar y mapear las ventas en "En Fabricación" o "En Tienda"
        this.ventasEnProceso = data.ventasConDetalles.filter((detalle: any) => {
          const venta = detalle.venta;
          return (
            venta.estado === 'En Fabricación' || venta.estado === 'En Tienda'
          );
        }).map((detalle: any) => ({
          codigoVenta: detalle.venta.codigo,
          productos: detalle.detallesVenta.map((detalleProducto: any) => ({
            codigo: detalleProducto.idProducto && detalleProducto.idProducto.codigo ? detalleProducto.idProducto.codigo : 'Código no disponible',
            nombre: detalleProducto.idProducto && detalleProducto.idProducto.nombre ? detalleProducto.idProducto.nombre : 'Nombre no disponible' // Ajusta según la estructura real de tus datos
          })),
          cliente: (detalle.venta.idCliente) ? `${detalle.venta.idCliente.nombres} ${detalle.venta.idCliente.apellidos}` : 'Cliente no disponible',
          fechaCreacion: new Date(detalle.venta.fechaCreacion).toLocaleDateString(),
          estado: detalle.venta.estado
        }));
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }


}
