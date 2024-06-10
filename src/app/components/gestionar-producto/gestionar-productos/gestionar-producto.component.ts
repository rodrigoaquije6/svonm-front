import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: './gestionar-producto.component.html',
  styleUrls: ['./gestionar-producto.component.css']
})
export class GestionarProductoComponent {

  listProducto: any[] = [];

  listProductoOriginal: Producto[] = [];

  terminoBusqueda: string = '';

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

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

  toggleEstadoProducto(producto: Producto): void {
    if (!producto || !producto._id) {
      console.error('El producto no está definido o no tiene un ID válido.');
      return;
    }

    const nuevoEstado = (producto.estado === 'Activo') ? 'Inactivo' : 'Activo';

    this._productoService.editarEstadoProducto(producto._id.toString(), nuevoEstado).subscribe(
      () => {
        console.log('Estado del producto actualizado correctamente');
        producto.estado = nuevoEstado;
      },
      (error) => {
        console.error('Error al actualizar el estado del producto:', error);
      }
    );
  }


  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
