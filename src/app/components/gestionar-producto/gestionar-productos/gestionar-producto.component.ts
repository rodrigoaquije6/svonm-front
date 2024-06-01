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

  listMontura: Montura[] = [];

  listLenteSol: LenteSol[] = [];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService,
              private api: LoginService,
              private router: Router,
              private _monturaService: MonturaService,
              private _lenteSolService: LenteSolService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerLenteSol();
    this.obtenerMontura();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProducto = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerMontura() {
    this._monturaService.getMontura().subscribe(data => {
      console.log(data);
      this.listMontura = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerLenteSol() {
    this._lenteSolService.getLenteSol().subscribe(data => {
      console.log(data);
      this.listLenteSol = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarMontura(id: any) {
    this._monturaService.eliminarMontura(id).subscribe(data => {
      this.toastr.info('El Producto fue eliminado con éxito!', 'Producto Eliminado!')
      this.obtenerMontura();
    }, error => {
      console.log(error);
    })
  }

  eliminarLenteSol(id: any) {
    this._lenteSolService.eliminarLenteSol(id).subscribe(data => {
      this.toastr.info('El Producto fue eliminado con éxito!', 'Producto Eliminado!')
      this.obtenerLenteSol();
    }, error => {
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
