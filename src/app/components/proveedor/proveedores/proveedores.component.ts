import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { LoginService } from 'src/app/services/login.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  listProveedor: Proveedor[] = [];

  constructor(private _proveedorService: ProveedorService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this._proveedorService.getProveedores().subscribe(data => {
      console.log(data);
      this.listProveedor = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProveedor(id: any) {
    this._proveedorService.eliminarProveedor(id).subscribe(data => {
      this.toastr.info('El proveedor fue eliminado con éxito!', 'Proveedor Eliminado!')
      this.obtenerProveedores();
    }, error => {
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('proveedor');
    this.router.navigate(['login']);
  }
}
