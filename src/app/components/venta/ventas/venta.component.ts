import { Component } from '@angular/core';
//import { Trabajador } from 'src/app/models/trabajador';
import { ToastrService } from 'ngx-toastr';
//import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo

@Component({
    selector: 'app-venta',
    templateUrl: './venta.component.html',
    styleUrls: ['./venta.component.css']
  })

  export class VentaComponent {
    //listVenta: Venta[] = [];
  }