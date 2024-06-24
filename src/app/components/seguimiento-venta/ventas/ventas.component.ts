import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listVenta: any[] = [];

  listProductoOriginal: Venta[] = [];

  ventaSeleccionada: any;
  modalRef: NgbModalRef | undefined;
  mensajeConfirmacion: string = '';
  estadoDestino: string = '';

  terminoBusqueda: string = '';

  constructor(private _ventaService: VentaService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this._ventaService.getVentas().subscribe((data: any) => {
      if (data && data.ventasConDetalles) {
        this.listVenta = data.ventasConDetalles.filter((venta: any) =>
          (venta.venta.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
            venta.venta.idCliente.nombres.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
            venta.venta.idCliente.apellidos.toLowerCase().includes(this.terminoBusqueda.toLowerCase())) &&
          venta.venta.estado === 'En Fabricación' || venta.venta.estado === 'En Tienda'
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

  prepararCambioEstado(id: string, nuevoEstado: string, content: any) {
    this.ventaSeleccionada = this.listVenta.find((v) => v.venta._id === id);
    this.estadoDestino = nuevoEstado;
    this.mensajeConfirmacion = `¿Estás seguro de cambiar el estado de la venta a "${nuevoEstado}"?`;

    // Abrir el modal de confirmación
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  confirmarCambioEstado() {
    if (this.ventaSeleccionada) {
      this._ventaService.actualizarEstadoVenta(this.ventaSeleccionada.venta._id, this.estadoDestino).subscribe(
        (data: any) => {
          this.toastr.success('El estado de la venta ha sido actualizado exitosamente.', 'Estado Actualizado');
          this.modalRef?.close(); // Cerrar el modal después de confirmar
          this.obtenerVentas();
        },
        (error) => {
          console.error('Error al actualizar el estado de la venta:', error);
          this.toastr.error(
            'Ocurrió un error al actualizar el estado de la venta. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      );
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
