import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IngresoService } from 'src/app/services/ingreso.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  listIngreso: any[] = [];

  listProductoOriginal: IngresoService[] = [];

  ingresoSeleccionado: any;
  modalRef: NgbModalRef | undefined;
  mensajeConfirmacion: string = '';
  estadoDestino: string = '';

  terminoBusqueda: string = '';

  constructor(private _ingresoService: IngresoService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerIngresos();
  }

  obtenerIngresos() {
    this._ingresoService.getIngresos().subscribe((data: any) => {
      if (data && data.ingresosConDetalles) {
        this.listIngreso = data.ingresosConDetalles.filter((ingreso: any) =>
          ingreso.ingreso.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          ingreso.ingreso.idProveedor.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          ingreso.ingreso.idProveedor.nombreContacto.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          ingreso.ingreso.idProveedor.apellidoContacto.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      }
    }, error => {
      console.log(error);
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.obtenerIngresos();
  }

  prepararCambioEstado(id: string, nuevoEstado: string, content: any) {
    this.ingresoSeleccionado = this.listIngreso.find((i) => i.ingreso._id === id);
    this.estadoDestino = nuevoEstado;
    this.mensajeConfirmacion = `¿Estás seguro de cambiar el estado del ingreso a "${nuevoEstado}"?`;

    // Abrir el modal de confirmación
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  confirmarCambioEstado() {
    if (this.ingresoSeleccionado) {
      this._ingresoService.actualizarEstadoIngreso(this.ingresoSeleccionado.ingreso._id, this.estadoDestino).subscribe(
        (data: any) => {
          this.toastr.success('El estado del ingreso ha sido actualizado exitosamente.', 'Estado Actualizado');
          this.modalRef?.close();
          this.obtenerIngresos();
        },
        (error) => {
          console.error('Error al actualizar el estado del ingreso:', error);
          this.toastr.error(
            'Ocurrió un error al actualizar el estado del ingreso. Por favor, inténtelo de nuevo más tarde.', 'Error');
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
