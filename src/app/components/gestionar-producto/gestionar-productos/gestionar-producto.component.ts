import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MonturaService } from 'src/app/services/montura.service';
import { LenteSolService } from 'src/app/services/lenteSol.service';
import { Montura } from 'src/app/models/montura';
import { LenteSol } from 'src/app/models/lenteSol';

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
              private router: Router,
              private _monturaService: MonturaService,
              private _lenteSolService: LenteSolService) { }

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


  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
