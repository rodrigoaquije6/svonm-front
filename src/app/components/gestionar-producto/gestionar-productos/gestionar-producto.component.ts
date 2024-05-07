import { Component } from '@angular/core';
import { GestionarProducto } from 'src/app/models/gestionar-producto';
import { ToastrService } from 'ngx-toastr';
import { GestionarProductoService } from 'src/app/services/gestionar-producto.service';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: './gestionar-producto.component.html',
  styleUrls: ['./gestionar-producto.component.css']
})
export class GestionarProductoComponent {
  listGestionarProducto: GestionarProducto[] = [];

  constructor(private _gestionarproductoService: GestionarProductoService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void { 
    this.obtenerGestionarProducto();
  }

  obtenerGestionarProducto() {
    this._gestionarproductoService.getGestionarProducto().subscribe(data => {
      console.log(data);
      this.listGestionarProducto = data;
    },error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any){
    this._gestionarproductoService.eliminarGestionarProducto(id).subscribe(data =>{
      this.toastr.info('El Producto fue eliminado con éxito!','Producto Eliminado!')
      this.obtenerGestionarProducto();
    },error =>{
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
