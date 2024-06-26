import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  listClientes: Cliente[] = [];

  constructor(private _clienteService: ClienteService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this._clienteService.getClientes().subscribe(data => {
      console.log(data);
      this.listClientes = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarLuna(id: any) {
    this._clienteService.eliminarCliente(id).subscribe(data => {
      this.toastr.info('El cliente fue eliminado con éxito!', 'Cliente Eliminado!')
      this.obtenerClientes();
    }, error => {
      console.log(error);
    })
  }

  generarHistorial(id: any, apellidos: string): void {
    this._clienteService.descargarHistorialCliente(id).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historial_cliente_${apellidos}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al generar historial de cliente:', error);
        if (error.status === 404) {
          this.toastr.warning('El cliente no ha realizado compras con el fin de tratar su vista ','¡Advertencia!');
        } else {
          this.toastr.error('Error al generar el historial del cliente');
        }
      }
    );
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('luna');
    this.router.navigate(['login']);
  }
}
