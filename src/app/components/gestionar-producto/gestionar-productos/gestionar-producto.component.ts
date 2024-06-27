import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: './gestionar-producto.component.html',
  styleUrls: ['./gestionar-producto.component.css']
})
export class GestionarProductoComponent {

  listProducto: any[] = [];

  listProductoOriginal: Producto[] = [];

  productoSeleccionada: any;
  modalRef: NgbModalRef | undefined;
  mensajeConfirmacion: string = '';
  estadoDestino: string = '';

  terminoBusqueda: string = '';

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe((data: Producto[]) => {
      console.log(data);
      this.listProducto = data.filter(producto =>
        producto.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }, error => {
      console.log(error);
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.obtenerProductos();
  }

  editarProducto(producto: any) {
    let ruta: string;

    switch (producto.tipoProducto.nombre) {
      case 'Montura':
        ruta = `/dashboard-gerente/gestionar-producto/editar-montura/${producto._id}`;
        break;
      case 'Lentes de sol':
        ruta = `/dashboard-gerente/gestionar-producto/editar-lente-sol/${producto._id}`;
        break;
      default:
        ruta = `/dashboard-gerente/gestionar-producto/editar-otro/${producto._id}`;
        break;
    }

    this.router.navigate([ruta]);
  }

  prepararCambioEstado(id: string, nuevoEstado: string, content: any) {
    this.productoSeleccionada = this.listProducto.find((p) => p._id === id);
    this.estadoDestino = nuevoEstado;
    this.mensajeConfirmacion = `¿Estás seguro de cambiar el estado del producto a "${nuevoEstado}"?`;

    // Abrir el modal de confirmación
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  confirmarCambioEstado() {
    if (this.productoSeleccionada) {
      this._productoService.actualizarEstadoProducto(this.productoSeleccionada._id, this.estadoDestino).subscribe(
        (data: any) => {
          this.toastr.success('El estado del producto ha sido actualizado exitosamente.', 'Estado Actualizado');
          this.modalRef?.close(); // Cerrar el modal después de confirmar
          this.obtenerProductos();
        },
        (error) => {
          console.error('Error al actualizar el estado del producto:', error);
          this.toastr.error(
            'Ocurrió un error al actualizar el estado del producto. Por favor, inténtelo de nuevo más tarde.',
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
