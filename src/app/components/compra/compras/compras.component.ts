import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  terminoBusqueda: string = '';

  constructor(private _ingresoService: IngresoService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerIngresos();
  }

  obtenerIngresos() {
    this._ingresoService.getIngresos().subscribe((data: any) => {
      console.log(data);
      if (data && data.ingresosConDetalles) {
        this.listIngreso= data.ingresosConDetalles.filter((ingreso: any) =>
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

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
