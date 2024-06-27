import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {
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
    this._productoService.getProductosActivos().subscribe((data: Producto[]) => {
      console.log(data);
      this.listProducto = data.filter(producto =>
        producto.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.tipoProducto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.marca.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }, error => {
      console.log(error);
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.obtenerProductos();
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
