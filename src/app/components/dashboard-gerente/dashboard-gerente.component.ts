import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';
import { IngresoService } from 'src/app/services/ingreso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from 'src/app/models/venta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-gerente',
  templateUrl: './dashboard-gerente.component.html',
  styleUrls: ['./dashboard-gerente.component.css']
})
export class DashboardGerenteComponent {
  isLoggedIn: boolean = this.api.isLogged();

  ventasConDetalles: any[] = [];
  listVentas: Venta[] = [];

  totalVentasMes: number = 0;
  totalDevolucionesMes: number = 0;
  totalGananciasMes: number = 0;

  //descuento: number = 0;
  trabajadorId: string | undefined;
  proveedoresConProductos: any[] = [];
  mostrarCardOrdenes: boolean = true;

  today: Date = new Date(); // Esta es la fecha actual

  ingresoForm: FormGroup;

  constructor(private api: LoginService,
    private router: Router,
    private _ventaService: VentaService,
    private _ingresoService: IngresoService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.ingresoForm = this.fb.group({
      idTrabajador: ['', Validators.required],
      //descuento: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPerfilTrabajador();
    this.obtenerTotalVentasFinalizadasMesActual();
    this.obtenerTotalDevolucionesMesActual();
    this.obtenerTotalGananciasMesActual();
    this.obtenerProveedoresConProductos();
  }

  getNombreMes(numeroMes: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[numeroMes - 1]; // Restamos 1 porque los arrays empiezan en índice 0
  }

  generarCsvVentasDeHoy() {
    this._ventaService.generarCsvVentasDeHoy()
      .subscribe(
        data => {
          console.log('CSV generado:', data);
          this.toastr.success('Abra el archivo de Power BI para visualizar el reporte de hoy.', '¡Archivo CSV generado y subido a GCP exitosamente!');
        },
        error => {
          console.error('Error al generar CSV:', error);
        }
      );
  }

  generarCsvVentasDeEsteMes() {
    this._ventaService.generarCsvVentasDeEsteMes()
      .subscribe(
        data => {
          console.log('CSV generado:', data);
          this.toastr.success('Abra el archivo de Power BI para visualizar el reporte del mes.', '¡Archivo CSV generado y subido a GCP exitosamente!');
        },
        error => {
          console.error('Error al generar CSV:', error);
        }
      );
  }

  generarCsvVentasDeEsteAnio() {
    this._ventaService.generarCsvVentasDeEsteAnio()
      .subscribe(
        data => {
          console.log('CSV generado:', data);
          this.toastr.success('Abra el archivo de Power BI para visualizar el reporte del año.', '¡Archivo CSV generado y subido a GCP exitosamente!');
        },
        error => {
          console.error('Error al generar CSV:', error);
        }
      );
  }

  obtenerPerfilTrabajador() {
    this.api.getProfile().subscribe(
      (profile) => {
        // Asignar el ID del trabajador automáticamente donde sea necesario
        this.trabajadorId = profile._id;
        this.ingresoForm.patchValue({
          idTrabajador: this.trabajadorId
        });
      },
      (error) => {
        console.error('Error al obtener el perfil del trabajador:', error);
        // Manejo de errores
      }
    );
  }

  esSabado(): boolean {
    const today = new Date();
    return today.getDay() === 4;
  }

  obtenerProveedoresConProductos(): void {
    this._ingresoService.obtenerProveedoresConProductos().subscribe(
      (data: any[]) => {
        this.proveedoresConProductos = data;
        console.log('Proveedores con productos:', this.proveedoresConProductos);
      },
      error => {
        console.error('Error al obtener proveedores con productos:', error);
        // Manejar el error según tu lógica de aplicación
      }
    );
  }

  ejecutarAutomatizacion(trabajadorId: string | undefined/*, proveedorId: string*/) {
    if (!trabajadorId) {
      console.error('ID del trabajador no definido.');
      return;
    }
    this._ingresoService.ejecutarAutomatizacion(trabajadorId/*, proveedorId, descuento*/)
      .subscribe(
        (response) => {
          console.log('Automatización de órden de compra exitosa:', response);
          this.toastr.success('Tus ordenes de compra han sido generadas.', '¡Órden(es) de compra generada(s) exitosamente!');
        },
        (error) => {
          console.error('Error en automatización de órdenes de compra:', error);
        }
      );
  }

  hayProveedoresConProductos(): boolean {
    return this.proveedoresConProductos && this.proveedoresConProductos.length > 0;
  }

  obtenerTotalVentasFinalizadasMesActual() {
    this._ventaService.obtenerVentasMesActual().subscribe(
      (data: any) => { // Asegúrate de ajustar el tipo 'any' según la estructura de tus datos
        // Filtrar solo las ventas con estado "Finalizada"
        this.ventasConDetalles = data.ventas.filter((v: any) => v.estado === 'Finalizada');
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
      (data: any) => { // Asegúrate de ajustar el tipo 'any' según la estructura de tus datos
        // Filtrar solo las ventas con estado "Finalizada"
        this.ventasConDetalles = data.ventas.filter((v: any) => v.estado === 'Reembolsada');
        this.listVentas = this.ventasConDetalles.map((v: any) => v.venta);
        this.totalDevolucionesMes = this.listVentas.length;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  obtenerTotalGananciasMesActual() {
    this._ventaService.obtenerVentasMesActual().subscribe(
      (data: any) => { // Ajusta el tipo 'any' según la estructura de tus datos
        // Filtrar solo las ventas finalizadas y reembolsadas
        const ventasFinalizadas = data.ventas.filter((v: any) => v.estado === 'Finalizada');
        const ventasReembolsadas = data.ventas.filter((v: any) => v.estado === 'Reembolsada');

        const totalFinalizadas = ventasFinalizadas.reduce((total: number, venta: any) => total + venta.total, 0);
        const totalReembolsadas = ventasReembolsadas.reduce((total: number, venta: any) => total + venta.total, 0);

        this.totalGananciasMes = totalFinalizadas - totalReembolsadas;
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
