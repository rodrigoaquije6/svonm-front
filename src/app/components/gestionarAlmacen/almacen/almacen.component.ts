import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { Almacen } from 'src/app/models/almacen';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
  listAlmacen: any[] = [];
  listId: any[] = [];
  listProducto: any[] = []
  TituloModal: string = "";
  CodigoModal: string = "";
  terminoBusqueda: string = '';

  id: string = "";
  stock: number = 0;

  constructor(private _almacenService: AlmacenService,
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private api: LoginService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe((data: Producto[]) => {
        console.log(data);
        this.listProducto = data.filter(producto =>
            (producto.estado === 'Activo') && 
            (producto.codigo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
            producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()))
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
