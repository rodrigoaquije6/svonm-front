import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';
import { IngresoService } from 'src/app/services/ingreso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from 'src/app/models/venta';

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

  descuento: number = 0;
  trabajadorId: string | undefined;

  ingresoForm: FormGroup;

  constructor(private api: LoginService,
    private router: Router,
    private _ventaService: VentaService,
    private _ingresoService: IngresoService,
    private fb: FormBuilder) {
    this.ingresoForm = this.fb.group({
      idTrabajador: ['', Validators.required],
      descuento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPerfilTrabajador();
    this.obtenerVentasConDetalles()
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

  ejecutarAutomatizacion(trabajadorId: string | undefined, descuento: number) {
    if (!trabajadorId) {
      console.error('ID del trabajador no definido.');
      return;
    }

    this._ingresoService.ejecutarAutomatizacion(trabajadorId, descuento)
      .subscribe(
        (response) => {
          console.log('Automatización de órdenes de compra exitosa:', response);
          this.router.navigate(['/dashboard-gerente/ingresos']);
        },
        (error) => {
          console.error('Error en automatización de órdenes de compra:', error);
          // Manejo de errores
        }
      );
  }

  obtenerVentasConDetalles() {
    this._ventaService.obtenerVentasMesActual()
      .subscribe(
        (data) => {
          this.ventasConDetalles = data.ventasConDetalles;
          // Extraer solo las ventas (sin detalles)
          this.listVentas = this.ventasConDetalles.map(v => v.venta);
          this.totalVentasMes = this.listVentas.length;
          console.log('Ventas del mes actual:', this.listVentas);
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
