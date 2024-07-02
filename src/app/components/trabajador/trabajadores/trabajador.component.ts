import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador';
import { ToastrService } from 'ngx-toastr';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  listTrabajador: any[] = [];

  trabajadorSeleccionado: any;
  modalRef: NgbModalRef | undefined;
  mensajeConfirmacion: string = '';
  estadoDestino: string = '';

  constructor(private _trabajadorService: TrabajadorService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerTrabajador();
  }

  obtenerTrabajador() {
    this._trabajadorService.getTrabajador().subscribe(data => {
      console.log(data);
      this.listTrabajador = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarTrabajador(id: any) {
    this._trabajadorService.eliminarTrabajador(id).subscribe(data => {
      this.toastr.info('El trabajador fue eliminado con éxito!', 'Trabajador Eliminado!')
      this.obtenerTrabajador();
    }, error => {
      console.log(error);
    })
  }

  prepararCambioEstado(id: string, nuevoEstado: string, content: any) {
    this.trabajadorSeleccionado = this.listTrabajador.find((t) => t._id === id);
    this.estadoDestino = nuevoEstado;
    this.mensajeConfirmacion = `¿Estás seguro de cambiar el estado del producto a "${nuevoEstado}"?`;

    // Abrir el modal de confirmación
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  confirmarCambioEstado() {
    if (this.trabajadorSeleccionado) {
      this._trabajadorService.actualizarEstadoTrabajador(this.trabajadorSeleccionado._id, this.estadoDestino).subscribe(
        (data: any) => {
          this.toastr.success('El estado del producto ha sido actualizado exitosamente.', 'Estado Actualizado');
          this.modalRef?.close(); // Cerrar el modal después de confirmar
          this.obtenerTrabajador();
        },
        (error) => {
          console.error('Error al actualizar el estado del producto:', error);
          this.toastr.error(
            'Ocurrió un error al actualizar el estado del producto. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      );
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('trabajador');
    this.router.navigate(['login']);
  }

}
